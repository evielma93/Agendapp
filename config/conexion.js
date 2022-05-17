/**
 *! Script de conexión a MySQL
*/
 const conexionMySQL = () => {

    const mysql = require('mysql2');

    let conexion = mysql.createConnection({
        host: 'localhost',
        port:3306,
        database: 'proyecto_horarios',
        user: 'root',
        password: '',
    });

    conexion.connect(function (err) {
        if (err) {
            console.error(`Error de conexión: ${err.stack}`);
            return;
        }
        console.info(`Conectado con el identificador ${conexion.threadId}`);
    });

    return conexion

}

module.exports = { 
    conexionMySQL 
}
