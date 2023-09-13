const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    companyId: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    resume: { type: String, required: true }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("candidature", userSchema);