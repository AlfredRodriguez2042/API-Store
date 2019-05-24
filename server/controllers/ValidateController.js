const Joi = require('@hapi/joi')

// validation

const validation = (user)=>{
    const schema = {
        name: Joi.string().required(),
        username: Joi.string().alphanum().min(5).max(12).required(),
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema)

}

const loginValidator = (user)=>{
    const schema = {
        username: Joi.string().alphanum().min(5).max(12).required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema)
}


module.exports = { validation, loginValidator }
