const { body } = require('express-validator');

const customerCreateValidation = [
    body("firstname")
        .notEmpty().withMessage("First name is required")
        .isLength({ min: 3, max: 30 }).withMessage("First name must be between 3 and 30 characters"),

    body("lastname")
        .notEmpty().withMessage("Last name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Last name must be between 3 and 30 characters"),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address")
        .matches(/^[a-zA-Z0-9_.+-]+@gmail\.com$/).withMessage("Only Gmail addresses are allowed"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body("role")
        .optional()
        .isIn(["admin", "user"]).withMessage("Role must be either admin or user")
];
module.exports = { customerCreateValidation };