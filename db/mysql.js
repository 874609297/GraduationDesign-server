const mysql = require('mysql')

const db =mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'599524',
    database:'projectdb'
})

module.exports = db