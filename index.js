//Usando modulos nátivos:
const path = require("path") // path: nos permite admistrar rutas de archivos

//Usando modules externos
const express = require("express")
const port = 4000

//Importando router
const users    = require("./routes/users"); // También podemos usar: require("./routes/users.js")
const calendar = require("./routes/calendar"); 

const app = express()
// Motor de plantilla de express
app.set('view engine', 'ejs');


//Sección para los middleware
app.use("/static",express.static(path.join(__dirname,"static"))) //Middleware para archivos estaticos
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Sección de codigo para los router
app.use(users) 
app.use(calendar) 


app.get("/",function(req,res){
    res.render('pages/layout');
})

app.listen(port,()=>{
    console.log("Escuchando en: http://localhost:"+port)
})