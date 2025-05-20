const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require('../models/Customer');
const { validationResult } = require("express-validator");
const { customerCreateValidation } = require('../validations/customerCreateValidation');
const { customerLoginValidation } = require('../validations/customerLoginValidation');

// Load environment variables
require('dotenv').config({ path: "./.env.local" });
const JWT_SECRET = process.env.JWT_SECRET || '1234567890$SECRETKEY';

// create a new customer using POST "/customer/account/create"
router.post('/create', customerCreateValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if email already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newCustomer = new Customer({
            ...req.body,
            password: hashedPassword,
        });

        const savedCustomer = await newCustomer.save();
        res.json(savedCustomer);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// login a customer using POST "/customer/account/login"
router.post('/login', customerLoginValidation , async (req, res) => {
    try {
        console.log("Login request received");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if the customer exists
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check if the password is correct
        const isPasswordValid = bcrypt.compareSync(password, customer.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate a JWT token
        const payload = { id: customer._id };
        const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

        return res.status(200).json({ message: "Login successful", token: authToken });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;