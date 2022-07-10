const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

module.exports = app;