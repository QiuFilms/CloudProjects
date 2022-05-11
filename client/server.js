const express = require('express')
const app = express()


app.listen(3001, () => {
    console.log(`Example app listening on port 3001`)
})

app.get('/', (req, res) => {
    res.send("Main")
})

app.get('/files', (req, res) => {
    res.sendFile(__dirname+"/public/index.html")
})

app.get('/files/:name', (req, res) => {
    res.sendFile(__dirname+"/public/index.html")
})

app.use(express.static("public"))