const db = require(`../model`)
const addUser = db.signup;
const { Op } = require('sequelize')


const Joi = require("joi")


const adduser = async (req, res) => {
    const signupSchema = Joi.object().keys({
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
    const { error } = signupSchema.validate(req.body)
    if (error) {
        console.log(error);
        res.json(error.details)
    } else {
        let info = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: req.body.password
        }
        const id = req.body.email
        const mob = req.body.mobileNumber
        const count_user = await addUser.count({
            where: {
                [Op.or]: [
                    { email: `${id}` },
                    { mobileNumber: `${mob}` }
                ]
            }
        })
        console.log(count_user);

        if (count_user) {
            return res.status(400).json({ message: 'user already registered' })
        }

        const user = await addUser.create(info)
        res.status(200).json({ message: "user added succesfully", data: user })

    }
}
const login = async (req, res) => {
    const id = req.body.email
    const cpass = req.body.password

    const user = await addUser.findOne({ where: { email: `${id}` } })
    console.log(user);
    let str = user.email; //json to single value
    let pas = user.password;

    if (id == str && cpass == pas) {

        res.status(200).json({ message: `logged in succesfully`, data: user })
    }
    else if (id == uID && cpass != pas) {
        res.status(200).json({ message: `password entered incorrect` })
    }
    else {
        res.status(400).json(`user not found`)
    }
}

module.exports = {
    adduser,
    login
}