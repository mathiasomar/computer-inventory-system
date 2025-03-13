const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError = require('../utils/error');
const jwt = require("jsonwebtoken")

// Display all users
exports.users = async (req, res, next) => {
    const users = await User.find().sort({ createdAt: -1 })
        .then(users => res.json(users))
        .catch(err => res.json(err))
}

// Display one user
exports.user = async (req, res, next) => {
    const user = await User.findById({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

// Add user
exports.addUser = async (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)

    try {
        const checkEmail = await User.findOne({ email: req.body.email })
        if (checkEmail) return next(new createError("Email Already Exists!", 404))

        const checkPhone = await User.findOne({ phone: req.body.phone })
        if (checkPhone) return next(new createError("Phone Already Exists!", 404))

        if (req.body.password !== req.body.passwordConf) return next(new createError("Password do not match!", 404))

        await User.create({ ...req.body, password: hashedPassword })
        res.status(201).json({ message: "User saved successfully" })
    } catch (error) {
        next(error)
    }
}

// Update user
exports.updateUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate({ _id: req.params.id }, { username: req.body.username, email: req.body.email, phone: req.body.phone, role: req.body.role })
        res.status(200).json({ message: "User updated successfully" })
    } catch (error) {
        next(error)
    }
}

// Update user password
exports.updatePassword = async (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.newPassword, 12)

    try {
        const user = await User.findById({ _id: req.params.id })
        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return next(new createError("Invalid Password!", 404))

        await User.findByIdAndUpdate({ _id: req.params.id }, { password: hashedPassword })

        res.status(200).json({ message: "Password Updated Successfully" })
    } catch (error) {
        next(error)
    }
}

// Update user profile picture
exports.updateProfilePic = async (req, res, next) => { }

// Delete user
exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "User Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(new createError("User not found!", 404))

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return next(new createError("Invalid Credentials!", 404))

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: "1d"
        })

        res.cookie('access_token', token, { httpOnly: true }).status(200).json({
            status: "success",
            message: "Credentials verified successfully",
            token,
            user: {
                name: user.username,
                email: user.email,
                role: user.role,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}