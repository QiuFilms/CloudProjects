async function createFolder(path, folder, setStatus){
    try {
        const response = await fetch(`http://localhost:5000/createFolder?user=${path}/${folder}`);
        const jsonData = await response.json();
  
        setStatus(jsonData)
      } catch (err) {
        console.error(err.message);
    }
}

async function createFile(path, file, setStatus){
    try {
        const response = await fetch(`http://localhost:5000/createFile?user=${path}/${file}`);
        const jsonData = await response.json();
  
        setStatus(jsonData)
      } catch (err) {
        console.error(err.message);
    }
}

export {createFolder, createFile}