/**
 *! Script de conexión a MySQL
 */

 const conexionMySQL = () => {


    let mysql = require('mysql');

    let conexion = mysql.createConnection({

        host: 'localhost',
        database: 'proyecto_horarios',
        user: 'root',
        password: '',

    });

    conexion.connect(function (err) {

        if (err) {
            console.error(`Error de conexión: ${err.stack}`);
            return;
        }

        console.log(`Conectado con el identificador ${conexion.threadId}`);

    });


    return conexion


}

module.exports = { 
    conexionMySQL 
}
