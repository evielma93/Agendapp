const database = require("../config/database")
const bcrypt   = require("bcrypt")

class Event{

    constructor(data){
        this.title       = data.name
        this.description = data.description
        this.start       = data.date
        this.color       = '#3A87AD'
        this.textColor   = '#ffffff'
        this.user        = data.user
        this.id          = data.id;
    }

    validate(){

        if(!(this.title && this.description && this.start)){
            return {
                message:"Debes completar todos los campos",
                validated:false
            }
        }
        
        return { validated:true }
    }

    async save(){
        const data = { title:this.title, description:this.description, start:this.start,user:this.user }
        try {
            const result = await database.query(
                "INSERT INTO events(??) VALUES(?)",
                [Object.keys(data),Object.values(data)]
            )
            data.id = result.insertId
            return { user:data, success:true, message:"Evento registrado correctamente" }

        }catch(error){
            return error
        }
    }

    async update(){
        const data = { title:this.title, description:this.description, start:this.start,user:this.user,id:this.id }
        try {

            const result = await database.query(
                'UPDATE events SET ? WHERE id = ?',[data,data.id]
            )

            data.id = result
            return { event:data, success:true, message: "Evento modificado correctamente" }

        }catch(error){
            return error
        }
    }


}

module.exports = Event