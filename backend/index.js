const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./db')

const authRoute = require("./routes/auth.route")
const inventoryRoute = require("./routes/inventory.route")

const app = express()
const port = 3000

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api/users', authRoute)
app.use('/api/inventories', inventoryRoute)

// CONNECT TO DATABASE
connectDB(process.env.MONGO_URI + "comp_inventory")

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))