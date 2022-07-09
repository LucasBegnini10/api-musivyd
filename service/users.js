const userSchema = require("../model/users");

module.exports = {
    async getAllUsers(){
        const allUsers = await userSchema.find();
        return allUsers;
    },

    async signUpService({email, password, name}){
        try {
            if(email && password && name){
                const newUser = new userSchema({
                    name: name,
                    password: password,
                    email: email
                })

                const response = await newUser.save();
                return response;

            }
        } catch (error) {
            throw new Error("Error user registration")
        }
    },

    async getOneUser({email}){
        try {
            if(email){
                const user = userSchema.find({
                    email: email
                })
                return user;
            }
        } catch (error) {
            throw new Error(`Error find users with email: ${email}`)
        }
    }
}