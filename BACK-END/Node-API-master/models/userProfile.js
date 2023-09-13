const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String,  required: true },
    address: { type: String,  required: true },
    city: { type: String, unique: true, required: true },
    postalCode: { type: String },
    education: [],
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String },
    resume: { type: String },
},
{
    timestamps: true
}
);

module.exports = mongoose.model("userProfile", userSchema);