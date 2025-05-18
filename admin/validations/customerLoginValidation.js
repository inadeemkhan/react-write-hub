const { body } = require('express-validator');

const customerLoginValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),

    body("password")
        .notEmpty().withMessage("Password is required"),
];
module.exports = { customerLoginValidation };