const jwt = require("jsonwebtoken");
require("dotenv/config")

const KEY_SECRET = process.env.KEY_JWT
const KEY_REFRESH_TOKEN = process.env.KEY_REFRESH_TOKEN

module.exports={
    createAcessToken({id, email, name}){
        const token = jwt.sign({id: id, email: email, name: name }, KEY_SECRET, {
            expiresIn: process.env.ACESS_TOKEN_EXPIRE
        })
        return token
    
    },
    createRefreshToken({id}){
        const refreshToken = jwt.sign({id}, KEY_REFRESH_TOKEN)
        return refreshToken;
    },
    verifyJWT(req, res, next){
        const token = req.headers['x-auth-token'];
        const refreshToken = req.headers['x-refresh-token']

        if (!token && !refreshToken) return res.status(401).json({ auth: false, message: 'No token provided.'});
        
        jwt.verify(token || refreshToken, token ? KEY_SECRET : KEY_REFRESH_TOKEN , function(err, decoded) {
          if (err) {
            if(err.message === "jwt expired"){
                return res.status(403).json({auth: false, message: "AcessToken expired"})
            }
            return res.status(500).json({ auth: false, message: 'Failed to  authenticate token.'})
        }
          req.userId = decoded.id
          next();
        });
    }

}