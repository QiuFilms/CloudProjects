function openFolder(e){
    e.stopPropagation();
    if(e.target.localName == "p" || e.target.localName == "img"){
        console.log(e.target.parentElement.getAttribute("name"))
    }else{
        console.log(e.target.getAttribute("name"))
    }

}

export default openFolder