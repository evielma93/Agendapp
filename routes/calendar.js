const express  = require("express");
const database = require("../config/database");
const Event    = require("../models/calendario")

const router   = express.Router();


router.get("/events", async function(req,res){
    try{
        const results = await database.query("SELECT * FROM events");
        const users   = await database.query("SELECT * FROM users")
        console.log(results,users);
        res.render('pages/calendar.ejs',{ results,users } );
    }catch(error){
        return res.json({ error:true, message:error });
    }
});

router.post("/createEvent",async (req,res) => {

    const events       = new Event(req.body);
    const validation   = events.validate();
    if(validation.validated){
        let register = await events.save();
        return res.render('pages/registro',{
            alert:true,
            alertTitle:register.message,
            alertMessage:`Evento Registrado con Exito`,
            alertIcon:'success',
            showConfirmButton:true,
            time:1500,
            ruta:'events'
        })
    }
    return res.json(validation)
})

router.post("/editEvent",async (req,res) => {

    const events       = new Event(req.body);
    const validation   = events.validate();
    if(validation.validated){
        let update = await events.update();
        console.log(update);
        return res.render('pages/registro',{
            alert:true,
            alertTitle:update.message,
            alertMessage:`Evento Registrado con Exito`,
            alertIcon:'success',
            showConfirmButton:true,
            time:1500,
            ruta:'events'
        })
    }
    return res.json(validation)
})

module.exports = router 