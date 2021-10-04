
const Billing = require('../../models/billings/billingModel');
const Joi = require('joi');
const _ = require('lodash')

module.exports.addBilling = async function (req, res) {

    try {
        const { userId, phone, email } = req.body;
        const schema = Joi.object({
            phone: Joi.string().required().length(11).pattern(/^[0-9]+$/).message("Phone Number should valid Bangladeshi Phone Number"),
            email: Joi.string().required().email().message("Email is not Valid"),
        })
        const data = schema.validate({ phone, email })

        if (data.error) {
            res.status(400).json({ message: data.error.details[0].message })
        } else {
            const found = await Billing.findOne({ userId });
            if (found) {
                res.status(400).json({ message: 'Already have billing address you can just update' })
            } else {
                const create = new Billing({ ...req.body });
                const saved = await create.save();
                if (saved) res.status(201).json({ message: 'Added Successfull' })
                else res.status(500).json({ message: 'Something went ' })
            }
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Expect userId
module.exports.getBillingByUserId = async function (req, res) {
    try {
        const found = await Billing.findOne(req.params.userId).populate('userId');
        if (found) {
            const user = _.pick(found.userId, ['firstName', 'lastName', 'phone', 'email', 'id', '_id', 'createdAt', 'updatedAt'])
            const billing = await _.pick(found, ['firstName', 'lastName', 'phone', 'email', 'country', 'division', 'district', 'zone', 'zipCode', 'fullAddress', 'createdAt', 'updatedAt'])
            res.status(200).json({ user, billing })
        } else {
            res.status(404).json({ message: 'Not Found ' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.deleteBillingById = async function (req, res) {
    try {
        const deleted = await Billing.findOneAndDelete(req.body.params);
        if (deleted) res.status(200).json({ message: 'Deleted Successfull', payload: deleted })
        else res.status(500).json({ message: 'Not Found And Deleted Not Successfull' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.updateBillingId = async function (req, res) {
    try {
        const { userId, phone, email } = req.body;
        const schema = Joi.object({
            phone: Joi.string().required().length(11).pattern(/^[0-9]+$/).message("Phone Number should valid Bangladeshi Phone Number"),
            email: Joi.string().required().email().message("Email is not Valid"),
        })
        const data = schema.validate({ phone, email })
        if (data.error) {
            res.status(400).json({ message: data.error.details[0].message })
        } else {
            const updated = await Billing.findOneAndUpdate(req.body.params, { ...req.body }, { new: true });
            if (updated) {
                res.status(200).json({ message: 'Updated Successfull' })
            } else {
                res.status(404).json({ message: `Not Found And Updated Not Successfull` })
            }
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}