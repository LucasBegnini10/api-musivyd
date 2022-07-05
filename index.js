const app = require("./server/routes/index");
const {connectMySql} = require("./infra/mySql")

const StartApi = async () => {

    const port = process.env.PORT || 3000

    try {
        await connectMySql();
        app.listen(port, () => {
            console.log(`API ON => http://localhost:${port}`, )
        })
        app.get("/", (req, res) => res.send("Hi, this is Musivyd's API"))
    } catch (error) {
        console.log("ERRO AO INICIAR A API", error)
    }
}

StartApi();