const userSchema = require("../model/users");


module.exports = {
    async getAllUsersService(){
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

    async getOneUserService({email, id}){
        try {
            if(email){
                const user = userSchema.find({
                    email: email
                })
                return user;
            }
            if(id){
                const user = userSchema.findById({
                    _id: id
                })
                return user;
            }
        } catch (error) {
            throw new Error(`Error find users with email: ${email}`)
        }
    },

    async updateUserService({id, name, password}){
       try {
        const filter = {_id: id};
        let update = {};
        if(name){
            update.name = name;
        }
        if(password){
            update.password = password;
        }

        const response = await userSchema.findOneAndUpdate(filter, update);
        if(response){
            const newUser = await userSchema.findById(id);
            return {
                update: true,
                newUser: newUser
            }
        }
       } catch (error) {
        throw new Error("Error update user")
       }
    },

    async deleteUserService({id}){
        try{
            await userSchema.findByIdAndDelete({
                _id: id
            })

            const userDeleted = await userSchema.findById({_id: id})
            return userDeleted;
        }
        catch(error){
            throw new Error("Error delete user")
        }
    }

    
}