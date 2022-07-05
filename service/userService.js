const {queryMySql} = require("../infra/mySql")

module.exports = {
    async signUp({name, email, password}){
        if(email, name, password){
            const query = `INSERT INTO users (id_user, name_user, email_user, password_user) 
            VALUES (default, '${name}', '${email}', '${password}')`
            const response = await queryMySql(query)
            return response;
        }
        else{
            return new Error("Invalid Data")
        }
    },
    
    async getUser({email}){
        const query = `SELECT * FROM users WHERE email_user = '${email}'`;
        const response = await queryMySql(query);
        return response;
    },

    async getAllUsers(){
        const query = `SELECT * from users`;
        const response = await queryMySql(query);
        return response;
    }
}