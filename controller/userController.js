const {getAllUsersService, signUpService, getOneUserService, updateUserService, deleteUserService} = require("../service/userService")
const {createAcessToken, createRefreshToken} = require("../middleware/JWT")
const validateObjectId = require("../utils/validateObjectId")


module.exports = {
    async getAllUsers(req, res){
        try {
            const allUsers = await getAllUsersService()
            res.json(allUsers)
        } catch (error) {
            console.log("ERROUU")
        }
    }, 

    async signUp(req, res){
        const {email, password, name} = req.body;
        
        if(email && password && name){
            const validateEmail = await getOneUserService({email});
       
            if(validateEmail.length > 0){
                res.status(400).json({
                    error: true,
                    message: 'User already registered'
                })
            }
            else{
                const response = await signUpService({name, password, email});
                if(response){
                    res.status(200).json({
                        sucess: true,
                        message: "Registration successful"
                    })
                }
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
        const {email} = req.params;
        const user = await getOneUserService({email});
        res.status(200).json({
            user
       })
    },

    async signIn(req, res){
        const {email, password} = req.body;
        
        if(email && password){
            const user = await getOneUserService({email: email})
            if(user && user.length > 0){
                if(user[0]?.password === password){
                    const id = user[0]?._id.toString()
                    const AcessToken = createAcessToken({
                        email,
                        password,
                        id,
                        name: user[0]?.name
                    });
                    const RefreshToken = createRefreshToken({id});
                    res.status(200).json({
                        sucess: true,
                        auth: {
                            AcessToken: AcessToken,
                            RefreshToken: RefreshToken
                        }
                    })
                }
                else{
                    res.status(400).json({
                        error: true,
                        message: "Password Invalid"
                    })
                }
            }
            else{
                res.status(400).json({
                    error: true,
                    message: "Email not Registered"
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

    async updateUser(req, res){
        const {id} = req.params;
        const newName = req.body?.name;
        const newPassword = req.body?.password;

        const idIsValid = validateObjectId(id);

        if(!id || !id.trim() || !idIsValid) return res.status(400).json({error: true, message: "Invalid Id"})
        if(!newName && !newPassword) return res.status(200).json({message: "No fields to update"})

        const user = await getOneUserService({id: id})

        if(user){
            const response = await updateUserService({id, name: newName, password: newPassword})

            if(response.update){
                res.status(200).json({
                    sucess: true,
                    message: "Update done successfully"
                })
            }
            else{
                res.status(400).json({
                    error: true,
                    message: 'Error updating'
                })
            }
        }
        else{
            res.status(404).json({
                error: true,
                message: "User not found"
            })
        }
    },

    async deleteUser(req, res){
        const {id} = req.params;

        const idIsValid = validateObjectId(id);

        if(!id || !id.trim() || !idIsValid) return res.status(400).json({error: true, message: "Invalid Id"});

        const userExists = await getOneUserService({id})

        if(!userExists) return res.status(404).json({message: "User not found"})

        const response = await deleteUserService({id});

        if(!response) res.status(400).json({sucess: true, message: "User successfully deleted"})

    },

    
}