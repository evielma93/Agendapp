const path    = require("path") // path: nos permite admistrar rutas de archivos

//*  Invocamos a express
const express = require("express")
const port    = 5000


//Importando router
const users    = require("./routes/users"); // También podemos usar: require("./routes/users.js")
const calendar = require("./routes/calendar"); 

const app = express();

// Motor de plantilla de express
app.set('view engine', 'ejs');


//Sección para los middleware

//?  Directorio public estatico 
app.use("/static",express.static(path.join(__dirname,"static")));
app.use("/fullcalendar", express.static(path.join(__dirname, 'node_modules', 'fullcalendar')));

//* Seteamos urlencoded para recibir los datos del formulario
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Sección de codigo para los router
app.use(users) 
app.use(calendar) 

const session = require('express-session');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

// Auh pages
app.get('/', (req,res) => {
    if(session.loggedin){
        res.render('pages/registro');
    }else{
        res.render('pages/login',{
            login:false,
            name:'Debe inciar sesión'
        })
    }
});

app.get('/logout', (req,res) => {

    session.loggedin = false;
    session.name     = null;
    res.redirect('/')
})

app.listen(port,()=>{
    console.log(`Escuchando en: http://localhost: ${port}`)
})