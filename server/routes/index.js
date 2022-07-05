const app = require("../config");
const express = require('express');

//CONTROLLER
const {signUp, getAllUsers} = require("../../controller/userController")

const router = express.Router();

router.post("/signUp", (req, res) => signUp(req, res))

router.get("/allUsers", (req, res) => getAllUsers(req, res))

app.use("", router)

module.exports = app;