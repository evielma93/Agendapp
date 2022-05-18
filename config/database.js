const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'proyecto_horarios',
    user: 'root',
    password: '',
})


function query(sql, data) {
    const miPromesa = new Promise(function (resolve, reject) {
        connection.query(sql, data, function (error, result, fields) {
            if (error != null) {
                console.log(error)
                return reject({ error: true, message: error.sqlMessage })
            } else {
                return resolve(result)
            }
        })
    })

    return miPromesa
}

module.exports = {
    connection,
    query
}
