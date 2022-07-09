const {getAllUsers, signUpService, getOneUser} = require("../service/users")

module.exports = {
    async getAllUsers(req, res){
        try {
            const allUsers = await getAllUsers()
            res.json(allUsers)
        } catch (error) {
            console.log("ERROUU")
        }
    }, 

    async signUp(req, res){
        const {email, password, name} = req.body;
        
        if(email && password && name){
            const response = await signUpService({name, password, email});
            if(response){
                res.status(200).json({
                    sucess: true,
                    message: "Registration successful"
                })
            }
        }
        else{
            res.status(400).json({
                error: true,
                message: "Invalid Data"
            })
        }
    },

    async getOneUser(req, res){
        const {email} = req.body;
        
    }
}