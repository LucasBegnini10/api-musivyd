const {createAcessToken} = require("../middleware/JWT")

module.exports = {
    async NewAcessToken(req, res){
        const {id, email, name} = req.body;
        const refreshToken = req.headers['x-refresh-token']
        const acessToken = createAcessToken({id, email, name})

        if(!id && !email && !name){
            res.staus(400).json({
                error: true,
                message: "Ivalid Data"
            })
        }

        res.status(201).json({
            auth:{
                AcessToken: acessToken,
                RefreshToken: refreshToken
            }
        })
    }
}