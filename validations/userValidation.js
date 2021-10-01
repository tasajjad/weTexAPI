const Joi = require('joi')
const schema = Joi.object({
    firstName: Joi.string().required().max(15).message('First Name is '),
    lastName: Joi.string().required().max(15).message("Last Name is so long please change"),
    phone: Joi.string().required().length(11).pattern(/^[0-9]+$/).message("Phone Number should valid Bangladeshi Phone Number"),
    email: Joi.string().required().email().message("Email is not Valid"),
    password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).message("Password should alphabet,numberice,special character"),
    confirmPassword: Joi.ref('password')

})

module.exports = schema;