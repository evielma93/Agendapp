const express  = require("express");
const database = require("../config/database");

const router   = express.Router();


router.get("/events", async function(req,res){
    try{
        const results = await database.query("SELECT * FROM events WHERE event_status = 1 AND event_user = 1");
        console.log(results);
        res.render('pages/calendar.ejs',{ results } );
    }catch(error){
        return res.json({ error:true, message:error });
    }
});

module.exports = router 