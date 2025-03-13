const createError = require('../utils/error');
const Inventory = require('../models/Inventory');

exports.inventories = async (req, res, next) => {
    const inventories = await Inventory.find().sort({ createdAt: -1 })
        .then(inventories => res.json(inventories))
        .catch(err => res.json(err))
}

exports.inventory = async (req, res, next) => {
    const inventory = await Inventory.findById({ _id: req.params.id }).sort({ createdAt: -1 })
        .populate({ path: "officerID", select: ["name", "username", "role", "email", "designation", "phone"] })
        .then(inventory => res.json(inventory))
        .catch(err => res.json(err))
}

exports.addInventory = async (req, res, next) => {
    try {
        const checkIfExists = await Inventory.findOne({ serialNo: req.body.serialNo })
        if (checkIfExists) return next(new createError("inventory already added Try updating!", 404))

        await Inventory.create({ ...req.body })
        res.status(201).json({ message: "Inventory Added Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.updateInventory = async (req, res, next) => {
    try {
        await Inventory.findByIdAndUpdate({ _id: req.params.id }, { ...req.body })
        res.status(200).json({ message: "Inventory Updated Successfully" })
    } catch (error) {
        next(error)
    }
}

exports.deleteInventory = async (req, res, next) => {
    try {
        await Inventory.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Inventory Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}