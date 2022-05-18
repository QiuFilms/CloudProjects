const express = require('express')
const app = express()
const port = 5000

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const fs = require('fs');
app.get("/dirs", async(req,res) =>{
    try {
        const user = req.query.user;
        
        fs.readdir(`${user}`, (err, files) => {

            let obj = {}

            let dirsCount = 0
            files.forEach((file) => {
                if(fs.lstatSync(`${user}/${file}`).isDirectory()){
                    obj[dirsCount] = file
                    dirsCount++
                }
            });
            res.json(obj)
        });
    } catch (error) {  
        console.log(error.message)
    }

})

app.get("/files", async(req,res) =>{
    try {
        const user = req.query.user;
        
        fs.readdir(`${user}`, (err, files) => {

            let obj = {}

            let filesCount = 0
            files.forEach((file) => {
                if(fs.lstatSync(`${user}/${file}`).isFile()){
                    obj[filesCount] = file
                    filesCount++
                }
            });
            res.json(obj)
        });
    } catch (error) {  
        console.log(error.message)
    }
})


const fastFolderSize = require('fast-folder-size')
app.get("/size", async(req,res) =>{
    try {
        const user = req.query.user;
        
        fastFolderSize(user, (err, bytes) => {
            if (err) {
              throw err
            }
          
            res.json(bytes)
          })
    } catch (error) {  
        console.log(error.message)
    }
})