const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const insertSQL = `INSERT INTO people(name) values('Nome ' + ${new Date().toISOString()})`
const selectSQL = `SELECT * FROM people;`

app.get('/', (req, res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)

    connection.query(insertSQL)
    connection.query(selectSQL, function(err, results, fields){
        responseStr = '';

        results.forEach(function(data){
            responseStr += '<p>Nome: ' + data.name + '</p>\n'
        });

        if (responseStr.length == 0)
            responseStr = 'Nenhuma nome encontrado';

        res.status(200).send('<h1>FullCycle - Node.js</h1>\n'+
                             '<h3>Tabela People</h3>\n'+
                             responseStr)
    })

    connection.end();
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})