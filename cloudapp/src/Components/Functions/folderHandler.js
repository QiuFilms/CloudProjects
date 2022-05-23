async function openFolderListDirs(e){
    e.stopPropagation();
    if(e.target.localName == "p" || e.target.localName == "img"){
        const url = e.target.parentElement.getAttribute("name")
        return await request(url)
        
    }else{
        const url = (e.target.getAttribute("name"))
        return await request(url)
    }

    async function request(url){
        try {
            const response = await fetch(`http://89.74.117.156//dirs?user=asd/${url}`);
            const jsonData = await response.json();
            
            return jsonData
          } catch (err) {
            return err.message;
          }
    }
}

async function openFolderListFiles(e){
    e.stopPropagation();
    if(e.target.localName == "p" || e.target.localName == "img"){
        const url = e.target.parentElement.getAttribute("name")
        return await request(url)
    }else{
        const url = (e.target.getAttribute("name"))
        return await request(url)
    }

    async function request(url){
        try {
            const response = await fetch(`http://89.74.117.156:5000/files?user=asd/${url}`);
            const jsonData = await response.json();
            
            return jsonData
          } catch (err) {
            return err.message;
          }
    }
}

export default openFolderListDirs