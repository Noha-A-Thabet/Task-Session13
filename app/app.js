const express = require("express")
const app = express()
require("./database/connection")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const userRoutes = require("../app/routes/user.routes")
app.use("/user", userRoutes)


module.exports = app