const express = require('express')
const app = express()
const cors = require('cors')

const path = require('path');
const fs = require('fs');

app.use(cors())

app.listen(3300, () => {
    console.log(`Example app listening on port 3300`)
})

app.get('/', (req, res) => {
    res.send(__dirname)
})

app.get('/files/:name', (req, res) => {
    const name = req.params.name
    fs.readdir(`${__dirname}/${name}`, (error, files) =>{
        if(error){
            res.send(error)
        }else{
            res.send(files)
        }
    })
})