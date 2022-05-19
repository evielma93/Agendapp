const express  = require("express")
const view     = require("../helpers/views")
const database = require("../config/database")
const User     = require("../models/user")

const router   = express.Router()


router.get("/users", async function(req,res){
    try{
        const results = await database.query("SELECT * FROM users")
        res.render('pages/listado.ejs',{results});
    }catch(error){
        return res.json({ error:true, message:error })
    }
});

router.get("/login",function(req,res){
    res.json({
        ruta:"login"
    })
})
router.get("/registro",(req,res) => {
    res.render('pages/registro');
})

router.post("/registro",async (req,res) => {

    const user       = new User(req.body);
    const validation = user.validate();

    if(validation.validated){
        return res.json(await user.save())
    }
    return res.json(validation)
})

router.post("/user/auth",async (req,res) => {
    res.json({
        ruta:"Verificacion de usuario"
    })
});


module.exports = router // Exportando