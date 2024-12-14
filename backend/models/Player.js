const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    ageCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    registrationFee: {
        isPaid: { type: Boolean, default: false },
        amount: { type: Number, default: 0 },
    },
    clothingFee: {
        isPaid: { type: Boolean, default: false },
        amount: { type: Number, default: 0 },
    },
    remarks: { type: String },
});

module.exports = mongoose.model('Player', playerSchema);
