const express = require('express')
const app = express()

const routes = require('./routes')

app.use(express.json())
app.use(routes)

const port = 8000

app.listen(port, () =>{
    console.log(`server berjalan pada http://localhost:${port}`)
})