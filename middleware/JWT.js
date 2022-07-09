const jwt = require("jsonwebtoken");
require("dotenv/config")

const KEY_SECRET = process.env.KEY_JWT

module.exports={
    createJWT({id, email, name}){
        const token = jwt.sign({id: id, email: email, name: name }, KEY_SECRET)
        return token
    
    },
    verifyJWT(req, res, next){
        const token = req.headers['x-auth-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, KEY_SECRET, function(err, decoded) {
          if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.'});
          next();
        });
    }

}