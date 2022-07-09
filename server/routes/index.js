const app = require("../config");
const express = require('express');

const {verifyJWT} = require("../..//middleware/JWT")

const {getAllUsers, signUp, signIn, getOneUser, updateUser, deleteUser} = require("../../controller/userController")

const router = express.Router();

router.get("/health", (req, res) => res.send("Server is ON!"))

router.get("/allUsers", verifyJWT ,(req, res) => getAllUsers(req, res))

router.get("/oneUser/:email", verifyJWT, (req, res) => getOneUser(req, res))

router.post("/signUp", (req, res) => signUp(req, res))

router.post("/signIn", (req, res) => signIn(req, res))

router.put("/user/:id", verifyJWT, (req, res) => updateUser(req, res))

router.delete("/user/:id", verifyJWT, (req, res) => deleteUser(req, res))


app.use(router)

module.exports = app;