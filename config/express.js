//* Configuración de Express

const getExpress = () => {

    const express = require("express")

    const app  = express();
    const port = 4000; // si desean cambiar de puerto modificamos aca

    app.use(express.text()) // Un middleware es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor.
    app.use(express.json())

    app.listen(port, () => {
        console.log(`Servidor ejecutandose en localhost: ${port}`);
    });


    return app

}

module.exports = {
    getExpress
}








// app.post("/usuarios",function(peticion,respuesta){
//     console.log(peticion.body)
//     respuesta.send("Método POST");
// })

// app.put("/",function(peticion,respuesta){
//     respuesta.send("Método PUT");
// })

// app.delete("/",function(peticion,respuesta){
//     respuesta.send("Método DELETE");
// })