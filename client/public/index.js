async function getData(){
    const name = document.querySelector("input")
    const respone = await fetch(`http://localhost:3300/files/${name.value}`)
    const data = await respone.json()
    displayFiles(data)
}

const displayFiles = (data) => {
    data.forEach(item =>{
        document.querySelector(".res").innerHTML += `${item}<br>`
    })
}
