const app = require("../config");
const express = require('express');

const {getAllUsers, signUp} = require("../../controller/userController")

const router = express.Router();


router.get("/allUsers", (req, res) => getAllUsers(req, res))

router.post("/signUp", (req, res) => signUp(req, res))


app.use("", router)

module.exports = app;