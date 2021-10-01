// const Joi = require('joi')

// const obj = {
//     firstName: "Sajjad",
//     lastName: "Ahmed",
//     phone: "01818729249",
//     email: "sajjad@gmail.com",
//     password: 'Tasajjad@2020',
//     confirmPassword: 'Tasajjad@2020'
// }


// const schema = Joi.object({
//     firstName: Joi.string().required().max(15).message("First Name is so long please change"),
//     lastName: Joi.string().required().max(15).message("Last Name is so long please change"),
//     phone: Joi.string().length(11).pattern(/^[0-9]+$/).required().message("Phone number not valid"),
//     email: Joi.string().email().required().message("Email is not Valid"),
//     password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).message("Password should alphabet,numberice,special character"),
//     confirmPassword: Joi.ref('password').message("Confirm Password Doesn`t match")

// })
// const schema = Joi.object({
//     firstName: Joi.string().required().max(15).message('First Name is '),
//     lastName: Joi.string().required().max(15).message("Last Name is so long please change"),
//     phone: Joi.string().pattern(/^[0-9]+$/).required().length(11).message("Phone Number should valid Bangladeshi Phone Number"),
//     email: Joi.string().required().email().message("Email is not Valid"),
//     password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).message("Password should alphabet,numberice,special character"),
//     confirmPassword: Joi.ref('password')


// })


// let res = schema.validate(obj)

// // console.log(res.error.details[0].message)
// console.log(res.error)

// let array = []
// for (let i = 0; i < 10000; i++) {
//     const number = Math.random()
//     const data = number.toString().split('.')
//     const final = Number.parseInt(data[1])
//     array.push(final)

// }

const code = require('uuid')

for (let i = 0; i < 10; i++) {
    console.log(code.v4())
}