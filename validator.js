const Joi = require("joi")

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false })
const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobileNumber: Joi.string().length(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"))
    .required()
    .messages({
        "string.pattern.base":
            "Password must contains at least 6 characters, including UPPER or lowercase with numbers.",
    }),
    confirmPassword: Joi.ref('password')
})

exports.validateSignup = validator(signupSchema)