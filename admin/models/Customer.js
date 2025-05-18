const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
{
    firstname: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minlength: [2, "First name must be at least 2 characters"],
        maxlength: [30, "First name must not exceed 30 characters"],
        match: [/^[a-zA-Z]+$/, "First name must contain only letters"],
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minlength: [2, "Last name must be at least 2 characters"],
        maxlength: [30, "Last name must not exceed 30 characters"],
        match: [/^[a-zA-Z]+$/, "Last name must contain only letters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
        /^[a-zA-Z0-9_.+-]+@gmail\.com$/,
        "Email must be a valid Gmail address",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
}, { timestamps: true } );
module.exports = mongoose.model("Customer", CustomerSchema);
