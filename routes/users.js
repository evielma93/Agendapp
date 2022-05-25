const express  = require("express")
const database = require("../config/database")
const User     = require("../models/user")
const session  = require('express-session');

const router   = express.Router()


router.get("/users", async function(req,res){
    try{
        const results = await database.query("SELECT * FROM users")
        res.render('pages/listado.ejs',{results});
    }catch(error){
        return res.json({ error:true, message:error })
    }
});

router.get("/login",(req,res) => {
    res.render('pages/login'); 
})

router.get("/registro",(req,res) => {
    res.render('pages/registro');
})

// Pasar parametros por url => /edit/:id
router.get('/edit/:id', async ( req , res) => {
    const id      = req.params.id;
    const results = await database.query("SELECT * FROM users WHERE id =?",[id]);
    console.log(results);
    res.render('pages/editar_usuario',{ user:results[0] });
});


router.post("/registro",async (req,res) => {

    const user       = new User(req.body);
    const validation = user.validate();

    if(validation.validated){
        let register = await user.save();
        console.log(register);
        return res.render('pages/registro',{
            alert:true,
            alertTitle:register.message,
            alertMessage:`Usuario Registrado con Exito con el id ${register.user.id}`,
            alertIcon:'success',
            showConfirmButton:true,
            time:1500,
            ruta:'users'
        })
    }
    return res.json(validation)
})

router.post("/update",async (req,res) => {

    const user       = new User(req.body);
    const validation = user.validate();

    if(validation.validated){
        let register = await user.update();
        console.log(register);
        return res.render('pages/registro',{
            alert:true,
            alertTitle:register.message,
            alertMessage:` ${register.message} con el id ${user.id}`,
            alertIcon:'success',
            showConfirmButton:true,
            time:1500,
            ruta:'users'
        })
    }
    return res.json(validation)
});

router.get('/delete/:id',async (req,res) => {
    const id = req.params.id;
    const results = database.query('DELETE FROM users WHERE id = ?',[id]);
    res.redirect('/users');
});

router.post("/user/auth",async (req,res) => {
    const user   = new User(req.body);
    const result = await user.login()
    console.log(result);
    let endPoint,icon = '';

    if(result.success){
        endPoint = 'users';
        icon    = 'success'; 
        session.loggedin = true;
        session.name     = user.name;
    }else{
        endPoint = '';
        icon     = 'error'; 
    }

    return res.render('pages/login',{
        alert:true,
        alertTitle:result.message,
        alertMessage:result.message,
        alertIcon:icon,
        showConfirmButton:true,
        time:2500,
        ruta:endPoint
    })

    //return res.json(result)

});


module.exports = router // Exportando