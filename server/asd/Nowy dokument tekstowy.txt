document.getElementById('input-file')
  .addEventListener('change', getFile)

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(
      document.getElementById('content-target'),
      input.files[0])
  }
}

function placeFileContent(target, file) {
	readFileContent(file).then(content => {
    let bodyHtml = content.split("body")[1]
    let cont = bodyHtml.substr(1,bodyHtml.length-3).trim()
    let str = cont.replace(/\s/g, '');
    target.value = str
    document.querySelector("code").insertAdjacentHTML('beforeend', str);
    getCodeTagContents()    
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    console.log(template.content.firstChild)
}

function getCodeTagContents(){
    let tags = document.querySelector("code").querySelectorAll(":scope > *")
    console.log(tags)

    const iterate = (obj) => {
        let newObj = {}
        Object.keys(obj).forEach(key => {
            
            console.log(`key: ${key}, value: ${obj[key].tagName}`)
            newObj[obj[key].tagName] = obj[key].childNodes
            
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                iterate(obj[key])
            }
        })
        return newObj
    }
    

    console.log(iterate(tags))

    for(let i = 0;i<tags.length;i++){
        //console.log(tags[i])
    }
}

function listNestedItems(item){
    let newItemObj = {}
    Object.keys(item).forEach(key => {
        
        console.log(`key: ${key}, value: ${oitemj[key].tagName}`)
        newObj[item[key].tagName] = item[key].children
        
        if (typeof item[key] === 'object' && item[key] !== null) {
            listNestedItems(item[key])
        }
    })
    return newObj
}
