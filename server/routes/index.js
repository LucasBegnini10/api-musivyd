const app = require("../config");
const express = require('express');

const {verifyJWT} = require("../../middleware/JWT")

const {getAllUsers, signUp, signIn, getOneUser, updateUser, deleteUser} = require("../../controller/userController")
const {NewAcessToken} = require("../../controller/authController")

const router = express.Router();

router.get("/health", (req, res) => res.send("Server is ON!"))

router.get("/allUsers", verifyJWT ,(req, res) => getAllUsers(req, res))

router.get("/oneUser/:email", verifyJWT, (req, res) => getOneUser(req, res))

router.post("/auth/signup", (req, res) => signUp(req, res))

router.post("/auth/signin", (req, res) => signIn(req, res))

router.post("/auth/refreshtoken", verifyJWT, (req, res) => NewAcessToken(req, res))

router.put("/user/:id", verifyJWT, (req, res) => updateUser(req, res))

router.delete("/user/:id", verifyJWT, (req, res) => deleteUser(req, res))


app.use(router)

module.exports = app;