const {signUp, getUser, getAllUsers} = require("../service/userService")

module.exports= {
    
    async signUp(req, res){
        const {name, email, password} = req.body;
        
        const validateEmail = await getUser({email})

       if(email && name && password){
            if(validateEmail && validateEmail.length === 0){
                const response = await signUp({name, email, password})
                if(response){
                    res.status(200).json({
                        error: false,
                        message: "User registered successfully!"
                    })
                }
            }else{
                res.status(400).json({
                    error: true,
                    message: "User already exists"
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

    async getAllUsers(req, res){
        const allUsers = await getAllUsers();
        if(allUsers){
            res.json({
                error: false,
                users: allUsers
            })
        }
    }

}