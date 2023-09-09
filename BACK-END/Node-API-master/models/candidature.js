const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id_user: { type: String, required: true },
    company_id: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone_number: { type: String },
    resume: { type: String, required: true },
    phoneNumber: { type: String },
    token: { type: String },
    type: {
        type: String,
        required: true,
        enum: ["user", "company"], // Allowed values for 'type'
    },

});

module.exports = mongoose.model("user", userSchema);