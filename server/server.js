const express = require('express')
const app = express()
const port = 5000

const cors = require('cors');
app.use(cors());
app.use(express.json({limit: '1000mb'}))
app.use(express.urlencoded({limit: '1000mb'}));

const defaultDir = "defaultDirectory"


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
        const dir = `${defaultDir}/${user}`
      
        fs.readdir(dir, (err, files) => {

            let obj = {}

            let dirsCount = 0
            files.forEach((file) => {
                if(fs.lstatSync(`${dir}/${file}`).isDirectory()){
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
        const dir = `${defaultDir}/${user}`

        fs.readdir(dir, (err, files) => {

            let obj = {}

            let filesCount = 0
            files.forEach((file) => {
                if(fs.lstatSync(`${dir}/${file}`).isFile()){
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

app.get("/downloaddFile", async(req, res) => {
  const path = req.query.user;
  //path = decodeURIComponent(path)
  const fullPath = `${defaultDir}/PFwnSLGTgYf5yZjAdQ6rIN6uNO93/${"sample.mp4"}`

  res.download(fullPath)
})

app.get("/createFolder", async(req,res) =>{
  try {
      const user = req.query.user;
      const dir = `${defaultDir}/${user}`
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true});
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
    const dir = `${defaultDir}/${user}`

    if (!fs.existsSync(dir)){
      fs.appendFileSync(dir, "", );
      res.send(["success","File successfuly created"])
    }else{
      res.send(["failed","File already exists"])
    }
  } catch (error) {  
      console.log(error.message)
  }
})


const fastFolderSize = require('fast-folder-size')
app.get("/size", async(req,res) =>{
    try {
        const user = req.query.user;
        
        fastFolderSize(`${defaultDir}/${user}`, (err, bytes) => {
            if (err) {
              throw err
            }
          
            res.json(bytes)
          })
    } catch (error) {  
        console.log(error.message)
    }
})


app.get("/readFile", async(req, res) =>{
  const path = req.query.user;
  const fullPath = `${__dirname}/${defaultDir}/${"PFwnSLGTgYf5yZjAdQ6rIN6uNO93/asd.txt"}`
  res.sendFile(fullPath)
})



app.post("/saveFile", async(req,res) =>{
      const {base, path, name} = req.body;


      var base64Data = base.replaceAll(" ", "+").replace(/^data:image\/png;base64,/, "");
      base64Data = base.replaceAll(" ", "+").replace(/^data:video\/mp4;base64,/, "");
      fs.writeFile(`${defaultDir}/${path}/${(name.replaceAll(" ","")).replaceAll("#","")}`, base64Data, 'base64', function(err) {
        console.log(err);
      });

      res.json({status: "Created"});
})




app.get('/video', async(req, res) => {
    let path = req.query.user;
    path = decodeURIComponent(path)
    const fullPath = `${defaultDir}/${path}`
    console.log(path)
    const stat = fs.statSync(fullPath)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(fullPath, {start, end})
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
      fs.createReadStream(fullPath).pipe(res)
    }
});


app.get('/image', function(req, res){
  const path = req.query.user;
  const fullPath = `${__dirname}/${defaultDir}/${path}`
  res.sendFile(fullPath);
})