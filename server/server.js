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


app.get("/createFolder", async(req,res) =>{
  try {
      const user = req.query.user;
      
      if (!fs.existsSync(user)){
        fs.mkdirSync(user);
        res.send(["success","Folder successfuly created"])
      }else{
        res.send(["failed","Folder already exists"])
      }
  } catch (error) {  
      console.log(error.message)
  }
})


app.get("/createFile", async(req,res) =>{
  try {
      const user = req.query.user;

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


app.get("/file", async(req,res) =>{
    res.sendFile("asd/dir/text.txt")
})


app.get('/video', function(req, res) {
    const path = req.query.user;
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });