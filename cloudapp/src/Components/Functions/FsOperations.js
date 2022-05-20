async function createFolder(path, file){
    try {
        const response = await fetch(`http://localhost:5000/createFolder?user=${url}/${file}`);
        const jsonData = await response.json();
  
        console.log(jsonData)
      } catch (err) {
        console.error(err.message);
    }
}

async function createFile(path, folder){
    try {
        const response = await fetch(`http://localhost:5000/createsFile?user=${url}/${folder}`);
        const jsonData = await response.json();
  
        console.log(jsonData)
      } catch (err) {
        console.error(err.message);
    }
}

export {createFolder, createFile}