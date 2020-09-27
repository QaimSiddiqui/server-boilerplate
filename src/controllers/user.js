const services = require('../services/user')

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await services.getAllUsers()
        res
            .status(200)
            .json({
                data: users
            })
    }
    catch (e) {
        next(e)
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await services.getUserbyId(userId)
        if(user)
        {
            res.status(200).json({
                data: user
            })
        }
        else
        {
            res.status(400).json({
                message: "User not found"
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const up = req.body
        const options = { new: true }
        const updates = await services.updateUser(userId, up, options)
        res.status(200).json({
            data: updates
        })
    } catch (err) {
        next(err)
    }
}