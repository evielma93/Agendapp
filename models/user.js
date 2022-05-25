const database = require("../config/database")
const bcrypt   = require("bcrypt")

class User{

    constructor(data){
        this.name     = data.name
        this.email    = data.email
        this.nick     = data.nick
        this.id       = data.id
        this.password = data.password
        this.data     = data
    }

    validate(){

        if(!(this.email && this.name && this.password && this.nick )){
            return {
                message:"Debes completar todos los campos",
                validated:false
            }
        }
        
        return { validated:true }
    }

    async save(){
        const data = { name:this.name, email:this.email, nick:this.nick, password: await this.encrypt(this.password), }
        try {
            const result = await database.query(
                "INSERT INTO users(??) VALUES(?)",
                [Object.keys(data),Object.values(data)]
            )

            delete data.password
            data.id = result.insertId
            return { user:data, success:true, message:"Usuario registrado correctamente" }

        }catch(error){
            return error
        }
    }

    async update(){
        const data = {
            name:this.name,
            email:this.email,
            nick:this.nick,
            id:this.id,
            password: await this.encrypt(this.password),
        }
        try {

            const result = await database.query(
                'UPDATE users SET ? WHERE id = ?',[data,data.id]
            )

            delete data.password
            data.id = result
            return { user:data, success:true, message:"Usuario modificado correctamente" }

        }catch(error){
            return error
        }
    }


    async login(){
        const result = await database.query("SELECT * FROM users WHERE email = ?",[this.email])
        const user = result[0]
        if(user){
            console.log(user);
            if(await this.compare(this.password,user.password)){
                delete user.password
                
                return {
                    success:true,
                    user,
                    message:"Usuario correcto"
                }

            }else{

                return {
                    success:false,
                    message:"Credenciales incorrectas"
                }

            }

        }

        return {
            success:false,
            message:"Usuario no registrado"
        }
    }


    async encrypt(string){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(string,salt)
        return hash
    }

    async compare(string,hash){
        return await bcrypt.compare(string,hash)
    }

}

module.exports = User