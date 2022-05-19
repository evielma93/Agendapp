const database = require("../config/database")
const bcrypt   = require("bcrypt")

class User{

    constructor(data){
        this.name     = data.name
        this.email    = data.email
        // this.username = data.username
        // this.birthday = data.birthday
        this.password = data.password
        this.data     = data
    }

    validate(){

        if(!(this.email && this.name && this.password)){
            return {
                message:"Debes completar todos los campos",
                validated:false
            }
        }
        
        return { validated:true }
    }

    async save(){
        const data = {
            name:this.name,
            email:this.email,
            password: await this.encrypt(this.password),
        }
        try {
            const result = await database.query(
                "INSERT INTO users(??) VALUES(?)",
                [Object.keys(data),Object.values(data)]
            )

            return result

        }catch(error){
            return error
        }
    }


    async encrypt(string){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(string,salt)
        return hash
    }
}

module.exports = User