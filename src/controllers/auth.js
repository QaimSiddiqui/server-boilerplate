const authHelper = require('../helpers/auth')
const userServices = require('../services/user')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const otpGenerator = require('otp-generator')
const emailServices = require('../services/email')



module.exports.registerUser = async (req, res) => {
  const { email, name, phone, password, address } = req.body


  const { error } = authHelper.registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //checking if a the user is already in the database
  const emailExist = await userServices.getUserByEmail(email)
  if (emailExist) return res.status(400).json({ message: "Email already exist" });

  //HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user
  const user = new User({
    name: name,
    email: email,
    phone: phone,
    address: address,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    //send(savedUser)
    res.status(200).json({ message: "user successfuly register", savedUser });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports.loginUser = async (req, res) => {
  const { error } = authHelper.loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  //checking if a the email exist in the database
  const user = await userServices.getUserByEmail(req.body.email)
  if (!user) return res.status(400).json({ message: "Email is found" });
  // Is password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ message: "Invalid password" });

  // create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN); // ${process.env.TOKEN_SECRET}
  res.header("auth-token", token).status(200).json({ data: token });

  //res.send('Logged in')
}

module.exports.forgetPassword = async (req, res, next) => {
  try{
    const { email } = req.body
    const user = await userServices.getUserByEmail(email)
    if(user)
    {
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      const updateUser = await userServices.updateUser(user._id, { otp }, { new: true })
      await emailServices.sendMail(user.email, 'Forget Password', `Your Otp is ${otp}`)
      res.status(200).json({
        message: 'check your email'
      })
    }
    else{
      res.status(400).json({
        message: "Email not exist"
      })
    }
  }
  catch(e)
  {
    next(e)
  }
}

module.exports.resetPassword = async (req, res, next) => {
  try{
    const { otp, password } = req.body
    const user = await userServices.getUserByOtp(otp)
    if(user)
    {
      if(password && password.length)
      {
        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updateUser = await userServices.updateUser(user._id, { otp: null, password: hashedPassword }, { new: true })
        
        res.status(200).json({
          message: 'Password updated'
        })
      }
      else
      {
        res.status(400).json({
          message: 'password must be 6 length long'
        })
      }
      
    }
    else{
      res.status(400).json({
        message: "OTP expired"
      })
    }
  }
  catch(e)
  {
    next(e)
  }
}


