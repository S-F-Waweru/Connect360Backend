// register schema

import Joi from "joi";

export const RegisterSchema = Joi.object({
    //UserName
    Username: Joi.string().trim().required().min(1),
    //Email
    Email: Joi.string().trim().required().email().min(1),
    //Password
    Password: Joi.string().trim().required().pattern(
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    ),
    //Role
    Role: Joi.string().trim().required().min(1),
})