const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const code = require('uuid')
const _ = require('lodash')
const User = require('../../models/users/userModel')
const { id } = require('../../validations/userValidation')
const schema = require('../../validations/userValidation')
const isEmail = require('../../utils/isEmail');


/**
 * 
 * @param {object} req 
 * @param {Object} res
 * this function not suitable for OTP system and Need mo0re 
 * middleware function 
 */

module.exports.signUp = async function (req, res) {
    const obj = _.pick(req.body, ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'])
    const data = schema.validate(obj)
    if (data.error) {
        res.status(400).json({ message: data.error.details[0].message })
    } else {
        const foundPhone = await User.findOne({ phone: req.body.phone })
        const foundEmail = await User.findOne({ email: req.body.email })
        if (foundPhone || foundEmail) {
            if (foundPhone && !foundEmail) {
                res.status(300).json({ message: 'This Phone number is already used' })
            } else if (!foundPhone && foundEmail) {
                res.status(300).json({ message: 'This Email is Already used ' })
            } else {
                res.status(300).json({ message: "Email and Phone Number Both are already used in This Site" })
            }
        } else {
            const number = Math.random()
            const data = number.toString().split('.')
            const final = data[1]

            const { password } = req.body
            // New Creation
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
            const user = new User({ ...req.body, password: hashed, id: final })
            const saved = await user.save()
            if (saved) res.status(201).json({ message: "User Created Successfull", payload: _.pick(saved, ['firstName', 'lastName', 'phone', 'email', 'id']) })
            else res.status(500).json({ message: 'Something Went Wrong !' })

        }
    }

}

module.exports.login = async function (req, res) {
    const { phoneOrEmail, password } = req.body;
    const isEmailTrue = isEmail(phoneOrEmail)
    // console.log("Data", isEmailTrue)
    if (isEmailTrue) {
        // console.log('Email')
        const found = await User.findOne({ email: phoneOrEmail })
        if (found) {
            let isValid = await bcrypt.compare(password, found.password)
            if (isValid) {
                let token = jwt.sign(_.pick(found, [
                    'firstName',
                    'lastName',
                    'phone',
                    'email',
                    'gender',
                    'id',
                    'date'
                ]), process.env.JWT_SECRET, { expiresIn: "30d" })
                res.status(200).json({
                    message: 'Login Successfull',
                    token: token
                })


            } else {
                res.status(401).json({ message: "email or password doesn't match" })
            }


        } else {
            res.status(404).json({ message: 'User not found in this email' })
        }
    } else if (phoneOrEmail.length === 11) {

        const found = await User.findOne({ phone: phoneOrEmail })
        if (found) {
            let isValid = await bcrypt.compare(password, found.password)

            if (isValid) {
                let token = jwt.sign(_.pick(found, [
                    'firstName',
                    'lastName',
                    'phone',
                    'email',
                    'gender',
                    'id',
                    'date'
                ]), process.env.JWT_SECRET, { expiresIn: "30d" })

                res.status(200).json({
                    message: 'Login Successfull',
                    token: token
                })

            } else {
                res.status(401).json({ message: "phone or password doesn't match" })
            }
        } else {
            res.status(404).json({ message: 'User not found in this phone number' })
        }
    } else {
        res.status(400).json({ message: 'Phone Numner or email not Valid' })
    }


}

module.exports.getAllUsers = async function (req, res) {
    try {
        const users = await User.find({})
        if (users.length > 0) {
            res.status(200).json({
                all: users.length,
                payload: users.map(user => {
                    return {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        gender: user.gender,
                        email: user.email,
                        phone: user.phone,
                        id: user, id,
                        _id: user._id,
                        date: user.date
                    }
                })
            })
        } else {
            res.status(404).json({ message: 'No User Found ' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.getUserById = async function (req, res) {
    const { id: _id } = req.params
    try {
        const user = await User.findById(_id);
        if (user) {
            res.status(200).json({
                user: _.pick(user, ['firstName', 'lastName', 'phone', 'gmail', 'gender', 'id', 'date'])
            })
        } else {
            res.status(404).json({ message: 'No user Found !' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// JUST RIGHT SUPER ADMIN
module.exports.deleteUserById = async function (req, res) {
    const { id: _id } = req.params;

    try {
        const deleted = await User.findByIdAndDelete(_id)
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfull', payload: deleted })
        } else {
            res.status(404).json({ message: 'User Not Found' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports.editUserById = async function (req, res) {

    const { id: _id } = req.params;
    try {
        const updated = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true })
        if (updated) {
            res.status(200).json({ message: 'Updated Successfull', payload: _.pick(updated, ['firstName', 'lastName', 'phone', 'email', 'gender']) })
        } else {
            res.status(404).json({ message: 'User Not Found And Update Not Success !' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// This function need one more middleware function That check OTP
module.exports.changePasswordById = async function (req, res) {
    const { newPassword, oldPassword } = req.body

    try {
        const { id: _id } = req.params;
        const { newPassword, oldPassword } = req.body
        const schema = Joi.object({
            newPassword: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).message("Password should alphabet,numberice,special character"),
        })
        const data = schema.validate({ newPassword })

        if (data.error) {
            res.status(400).json({ message: data.error.details[0].message })
        } else {
            const found = await User.findById(_id)
            if (found) {
                const isValid = await bcrypt.compare(oldPassword, found.password)
                if (isValid) {
                    const salt = await bcrypt.genSalt(10)
                    const hashed = await bcrypt.hash(newPassword, salt)
                    const updated = await User.findByIdAndUpdate(_id, { password: hashed }, { new: true })
                    if (updated) res.status(200).json({ message: 'Password Change Successfull' })
                    else res.status(500).json({ message: 'Internal Server Error' })
                } else {
                    res.status(404).json({ message: 'Password Does not match' })
                }
            } else {
                res.status(404).json({ message: 'Not Found And password change not successfull' })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })

    }
}