const mongoose = require('mongoose');
const joi = require('joi');

const dbSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    }
});

const validateSignupInfo = async (data) => {
    const userSignupSchema = joi.object({
        name: joi.string().min(3).max(255).required(),
        email: joi.string().min(3).max(255).email().required(),
        password: joi.string().min(6).max(1024).required()
    });

    try {
        await userSignupSchema.validateAsync(data);
    } catch (error) {
        return error;
    }
};

const validateLoginInfo = async (data) => {
    const userLoginSchema = joi.object({
        email: joi.string().min(3).max(255).email().required(),
        password: joi.string().min(6).max(1024).required()
    });

    try {
        await userLoginSchema.validateAsync(data);
    } catch (error) {
        return error;
    }
};

module.exports.User = mongoose.model('User', dbSchema);
module.exports.validateSignupInfo = validateSignupInfo;
module.exports.validateLoginInfo = validateLoginInfo;
