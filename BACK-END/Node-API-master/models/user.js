const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ["user", "company"], // Allowed values for 'type'
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
});

module.exports = mongoose.model("user", userSchema);