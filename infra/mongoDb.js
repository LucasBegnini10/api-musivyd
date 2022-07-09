const mongoose = require("mongoose");
require("dotenv").config();

function connectMongo(){
    mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("Conexão estabelecida"))
    .catch((err) => console.error("ERRO", err))
}


module.exports = connectMongo;