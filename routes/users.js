const express           = require("express")
const { conexionMySQL } = require('../config/conexion');

const conexion = conexionMySQL();

const router   = express.Router();


router.get("/users",function(req,res){
    conexion.query('SELECT * FROM users', function (error, results, fields) {

        if (error != null){
            res.json({
                message:error.sqlMessage
            })
        }
        res.json(results);
    });
    
})

router.get("/login",(req,res) => {
    const user     = req.body.user;
    const password = req.body.password;
    if(user == 'admin' && password == '12345'){
        res.json({
            message:'Autenticación Exitosa!'
        });
    }else{
        res.json({
            message:'INGRESE CORRECTAMENTE SUS CREDENCIALES'
        });
    }
})

router.post("/registro",function(req,res){
    
    const body = req.body

    conexion.query(
        "INSERT INTO users(??) VALUES(?) ",
        [Object.keys(body),Object.values(body)]
    )

    return res.json({message:"SUCCESS"})

})


module.exports = router // Exportando