const express = require('express');
const inventoryController = require("../controllers/inventory.controller");
const isAuth = require('../middleware/isAuth');

const router = express.Router()

router.get("/", isAuth, inventoryController.inventories)
router.get("/:id", isAuth, inventoryController.inventory)
router.post("/add", isAuth, inventoryController.addInventory)
router.put("/update/:id", isAuth, inventoryController.updateInventory)
router.delete("/delete/:id", isAuth, inventoryController.deleteInventory)

module.exports = router