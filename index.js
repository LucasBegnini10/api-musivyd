const app = require("./server/config")

const StartApi = async () => {

    const port = process.env.PORT

    try {
        app.listen(port, () => {
            console.log(`API ON => http://localhost:${port}`, )
        })
    } catch (error) {
        console.log("ERRO AO INICIAR A API", error)
    }
}

StartApi();