const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const OthersAdmin = require('../../models/othersAdmin/othersAdmin');

module.exports.create = async function (req, res) {
    const { name, phone, email, password, type } = req.body;

    const schema = Joi.object({
        phone: Joi.string().required().length(11).pattern(/^[0-9]+$/).message("Phone Number should valid Bangladeshi Phone Number"),
        email: Joi.string().required().email().message("Email is not Valid"),
        password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).message("Password should alphabet,numberice,special character"),
    })
    const data = schema.validate({ phone, email, password })
    if (data.error) {
        res.status(400).json({ message: data.error.details[0].message })
    } else {
        try {
            const found = await OthersAdmin.find({});
            console.log(found)
            if (found.length >= 2) {
                res.status(400).json({ message: 'Already two admin available you cannot create one more' })
            } else {
                if (found[0].type === type || found[0].type === type) {
                    res.status(400).json({ message: 'This Type Admin also Here ' })
                } else {
                    if (found[0].phone === phone || found[1].phone === phone) {
                        res.status(400).json({ message: 'Phone Number Already Exist' })
                    } else {
                        // Creation Phase
                        const salt = await bcrypt.genSalt(10);
                        const hashed = await bcrypt.hash(password, salt);
                        if (hashed) {
                            const create = new OthersAdmin({ name, phone, email, password: hashed, type });
                            const saved = await create.save();
                            if (saved) res.status(201).json({ message: `${type} Manager admin added successfull` })
                            else res.status(500).json({ message: 'Something went wrong' })
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: err.message })
        }
    }

}
module.exports.login = async function (req, res) {

}
module.exports.deleteAdmin = async function (req, res) {

}
module.exports.update = async function (req, res) {

}
module.exports.changePassword = async function (req, res) {

}

module.exports.getAllAdmin = async function (req, res) {

}
module.exports.getAdminById = async function (req, res) {

}

