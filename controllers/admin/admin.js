const Admin = require('../../models/admin/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const Joi = require('joi')


module.exports.createAdmin = async function (req, res) {
    let { password } = req.body
    const { name, phone, email, company } = req.body;
    const schema = Joi.object({
        password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).message("Password should alphabet,numberice,special character"),
    })
    const data = schema.validate({ password })
    if (data.error) {
        res.status(400).json({ message: data.error.details[0].message })
    } else {
        try {
            const found = await Admin.findOne({ phone })
            if (found) {
                res.status(300).json({ message: "Admin Already Exist" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(password, salt)
                const create = new Admin({ name, phone, email, company: { ...company }, password: hashed })
                const saved = await create.save()
                if (saved) {
                    res.status(200).json({ message: "User Create Successfull", payload: saved })
                } else {
                    res.status(500).json({ message: "Internal Servel Error" })
                }
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

}

module.exports.getAdminById = async function (req, res) {
    const { id: _id } = req.params;
    console.log(_id)
    try {
        const found = await Admin.findById(_id)
        if (found) res.status(200).json({ message: found })
        else res.status(404).json({ message: "Admin Not Found In This id" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}
// I Hope This is Not Neccessary
module.exports.deleteAdminById = async function (req, res) {

}
module.exports.editAdminById = async function (req, res) {
    const { id: _id } = req.params;
    console.log(_id)
    try {
        const found = await Admin.findByIdAndUpdate(_id, { ...req.body }, { new: true })
        if (found) res.status(200).json({ message: `Updated Succesfull`, payload: found })
        else res.status(404).json({ message: "Admin Not Found In This id" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


// Login
module.exports.loginAdminById = async function (req, res) {

    const { phone, password } = req.body
    try {
        const found = await Admin.findOne({ phone })
        if (found) {
            const isAuthenticate = await bcrypt.compare(password, found.password);
            if (isAuthenticate) {
                const data = jwt.sign({ name: found.name, phone: found.phone, email: found.email }, process.env.JWT_SECRET, { expiresIn: "30d" })
                res.status(200).json({
                    message: `Login Successfull`,
                    token: data
                })
            } else {
                res.status(401).json({ message: "Password or phone number doesn`t match" })
            }
        } else {
            res.status(404).json({ message: "Password or phone number doesn`t match!" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

module.exports.changePasswordByAdminId = async function (req, res) {
    const { id: _id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const schema = Joi.object({
        newPassword: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).message("Password should alphabet,numberice,special character"),
    })
    const data = schema.validate({ newPassword })
    if (data.error) {
        res.status(400).json({ message: data.error.details[0].message })
    } else {
        const found = await Admin.findById(_id);
        if (found) {
            const isValid = await bcrypt.compare(oldPassword, found.password);
            if (isValid) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(newPassword, salt)
                if (hashed) {
                    const updated = await Admin.findByIdAndUpdate(_id, { password: hashed }, { new: true })
                    if (updated) res.status(200).json({ message: 'Password Change Successfull' })
                    else res.status(500).json({ message: 'Something Went Wrong' })
                }
            } else {
                res.status(400).json({ message: "Password does not match" })
            }
        } else {
            res.status(404).json({ message: 'Admin Not Found And Updated Not Successfull' })
        }
    }
}