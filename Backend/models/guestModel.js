const mongoose = require("mongoose");
const validator = require("validator");

const guestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Guest must have a name"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Guest must have an email ID"],
        validate: [validator.isEmail, "Email is invalid"]
    },
    nationality: {
        type: String,
        required: [true, "Guest must have a nationality"],
        trim: true
    },
    nationalId: {
        type: String,
        required: [true, "Guest must have a national ID"],
        trim: true
    },
    countryFlag: {
        type: String,
        required: [true, "Guest must have a country flag ID"]
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const guestModel = mongoose.model("Guest", guestSchema);

module.exports = guestModel;
