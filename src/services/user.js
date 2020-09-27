const User = require('../models/User')

module.exports.getUserbyId = (userId) => {
    return  User.findById(userId).select('name email phone isCourier address featureAddress')
}

module.exports.updateUser = (userId, up, options) => {
    return User.findByIdAndUpdate(userId, up, options)   
}

module.exports.getUserByEmail = email => {
    return  User.findOne({ email: email });
}
