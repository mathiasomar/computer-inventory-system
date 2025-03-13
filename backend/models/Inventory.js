const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    specs: {
        type: String
    },
    serialNo: {
        type: String,
        required: true,
        unique: true
    },
    officerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    floorNo: {
        type: Number,
        required: true
    },
    officeNo: {
        type: Number,
        required: true
    },
    officer: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: ["good", "bad", "upgrade"],
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Inventory = mongoose.model('Inventory', inventorySchema)
module.exports = Inventory