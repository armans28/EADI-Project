const mysql = require('mysql')

const pool = mysql.createPool({
    host: "nama-host-eadi",
    user: "namauserdatabase",
    password: "passwordjikaada",
    database: "namadatabasenya",
  })

module.exports = pool