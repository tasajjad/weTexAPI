const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _ = require('lodash')
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
            // console.log(found)
            if (found.length === 0) {
                // Creation Phase
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                if (hashed) {
                    const create = new OthersAdmin({ name, phone, email, type, password: hashed });
                    const saved = await create.save();
                    if (saved) res.status(201).json({ message: `${type} Manager admin added successfull` })
                    else res.status(500).json({ message: 'Something went wrong' })
                }
            } else {
                if (found.length >= 2) {
                    res.status(400).json({ message: 'Already two admin available you cannot create one more' })
                } else {
                    if (found[0].type === type || found[0].type === type) {
                        res.status(400).json({ message: 'This Type Admin also Here ' })
                    } else {
                        // console.log('Data', found)
                        let data = found.length === 1 ? found[0].phone === phone : found[0].phone === phone || found[1].phone === phone
                        // found[0].phone === phone
                        // console.log('Logic', data)
                        if (data) {
                            res.status(400).json({ message: 'Phone Number Already Exist' })
                        } else {
                            // Creation Phase
                            const salt = await bcrypt.genSalt(10);
                            const hashed = await bcrypt.hash(password, salt);
                            if (hashed) {
                                const create = new OthersAdmin({ name, phone, email, type, password: hashed });
                                const saved = await create.save();
                                if (saved) res.status(201).json({ message: `${type} Manager admin added successfull` })
                                else res.status(500).json({ message: 'Something went wrong' })
                            }
                        }
                    }
                }
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

}
/**
 * Expect phone,type,password
 */
module.exports.login = async function (req, res) {
    const { password, type, phone } = req.body;
    try {
        const found = await OthersAdmin.findOne({ phone, type });
        if (found) {
            const isValid = await bcrypt.compare(password, found.password);
            const token = jwt.sign(_.pick(found, ['name', 'phone', 'email', 'type']), process.env.JWT_SECRET, { expiresIn: "30d" })
            if (isValid) res.status(200).json({ message: `Login Successfull`, token: token });
            else res.status(500).json({ message: 'Password or phone number does not match' })
        } else {
            res.status(404).json({ message: `Not Found Admin in sector in This Number` })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Recieve ID
module.exports.deleteAdmin = async function (req, res) {
    const { id: _id } = req.params;
    try {
        const deleted = await OthersAdmin.findByIdAndDelete(_id);
        if (deleted) {
            res.status(200).json({ message: 'Deleted Successfull', payload: deleted.name })
        } else {
            res.status(404).json({ message: `Not Found and Deleted Not Successfull` })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports.update = async function (req, res) {
    const { id: _id } = req.params;

    try {
        const updated = await OthersAdmin.findByIdAndUpdate(_id, { ...req.body }, { new: true });
        if (updated) {
            res.status(200).json({ message: `Updated Succesfull`, payload: _.pick(updated, ['name', 'phone', 'email', 'type']) })
        } else {
            res.status(500).json({ message: 'Not Found updated Not Successfull' })
        }
    } catch (err) {

    }
}
// Pause
module.exports.changePassword = async function (req, res) {

}

module.exports.getAllAdmin = async function (req, res) {

}
module.exports.getAdminById = async function (req, res) {

}

