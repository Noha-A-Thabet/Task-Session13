const userController = require("../controller/user.controller")
console.log(userController)
const router = require("express").Router()
router.post("/register", userController.create)
router.get("/", userController.index)
router.post("/login", userController.login)
router.post("/single/:id", userController.single)
router.patch("/single/:id", userController.edit)
router.delete("/single/:id", userController.delete)

module.exports = router

// 