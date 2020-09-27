const jwt = require("jsonwebtoken");
const Joi = require('@hapi/joi')

module.exports.verifyToken = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' })
  }
};

// register validations
module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string().min(11).required(),
    isCourier: Joi.string().required(),
    address: Joi.string().required(),
    featureAddress: Joi.string().empty(true),
    description: Joi.string().empty(true),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data);
}

module.exports.loginValidation = (data) => {
  const schema = Joi.object({

    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()

  })
  return schema.validate(data);
}


