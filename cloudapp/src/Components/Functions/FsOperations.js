async function createFolder(path, folder, setStatus, uid){
    try {
        const response = await fetch(`http://localhost:5000/createFolder?user=${path}/${folder}&uid=${uid}`);
        const jsonData = await response.json();
  
        setStatus(jsonData)
      } catch (err) {
        console.error(err.message);
    }
}

async function createFile(path, file, setStatus, uid){
    try {
        const response = await fetch(`http://localhost:5000/createFile?user=${path}/${file}&uid=${uid}`);
        const jsonData = await response.json();
  
        setStatus(jsonData)
      } catch (err) {
        console.error(err.message);
    }
}

export {createFolder, createFile}