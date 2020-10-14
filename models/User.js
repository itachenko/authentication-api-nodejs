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

const userSchema = joi.object({
    name: joi.string().min(3).max(255).required(),
    email: joi.string().min(3).max(255).email().required(),
    password: joi.string().min(6).max(1024).required()
});

module.exports.User = mongoose.model('User', dbSchema);
module.exports.userSchema = userSchema;
