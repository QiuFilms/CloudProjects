import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import folder from "../Images/folder.png"
import file from "../Images/file.png"
import openFolderListDirs from '../Functions/folderHandler';
import ProfileOffCanvas from './ProfileOffCanvas';

const MainContent = () => {
  const [dirs, setDirs] = useState([]);
  const [files, setFiles] = useState([]);

  const [path, setPath] = useState("asd");

  const getDirs = async (url) =>{
    try {
      const response = await fetch(`http://localhost:5000/dirs?user=${url}`);
      const jsonData = await response.json();

      setDirs(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  }

  const getFiles = async (url) =>{
    try {
      const response = await fetch(`http://localhost:5000/files?user=${url}`);
      const jsonData = await response.json();

      setFiles(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  }

  const Files = async (url) =>{
    try {
      const response = await fetch(`http://localhost:5000/files?user=${url}`);
      const jsonData = await response.json();

      setFiles(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  }

useEffect(() => {
  getDirs(path);
}, [path]);

useEffect(() => {
  getFiles(path);
}, [path]);


function openFolderDirs(e){
  e.stopPropagation();
  if(e.target.localName == "p" || e.target.localName == "img"){
      const url = e.target.parentElement.getAttribute("name")
      setPath(`${path}/${url}`)
      getDirs(path)
  }else{
      const url = e.target.getAttribute("name")
      setPath(`${path}/${url}`)
      getDirs(path)
  }
}


function fileExt(item){
  let file = item.split(".")
  return file[file.length-1].toString()
}


function HandleVideo(e){

  function getExt(){
    e.stopPropagation();
    if(e.target.localName == "p" || e.target.localName == "img"){
        return [e.target.parentElement.getAttribute("ext"),e.target.parentElement.getAttribute("name")]
    }else{
        return [e.target.getAttribute("ext"),e.target.getAttribute("name")]
    }
  }

  const ext = getExt()
  if(ext[0] == "mp4"){
    const url = `${path}/${ext[1]}`
    const fullUrl = `http://localhost:5000/video?user=${url}`
    console.log(fullUrl)
    document.querySelector("#videoPlayer").style.display ="block"
    document.querySelector("#videoPlayer").src = fullUrl
  }
}

document.addEventListener('mouseup', (e) =>{
  e.preventDefault()
  console.log(e.button)
});

  return (
    <>
      <div className="d-flex">
        {Object.keys(dirs).map(item => (
            <div key={item} name={dirs[item]} className="default" onClick={(e) => openFolderDirs(e)}>
              <img src={folder} alt="folder"/>
              <p>{dirs[item]}</p>
            </div>
            ))}

        {Object.keys(files).map(item => (
            <div key={item} ext={fileExt(files[item])} name={files[item]} className="default" onClick={HandleVideo} data-bs-toggle="offcanvas" data-bs-target="#staticBackdropVideo">
              <img src={file} alt="file"/>
              <p>{files[item]}</p>
            </div>
            ))}
      </div>

      <div className="offcanvas offcanvas-start w-100 bg" data-bs-backdrop="offcanvas" tabIndex="-1" id="staticBackdropVideo" aria-labelledby="staticBackdropLabel" style={{backgroundColor:"rgba(65, 64, 64, 0.6)"}}>
      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div className="position-absolute top-50 start-50 translate-middle">
          <video id="videoPlayer" controls style={{display:"none",height:"95vh"}}>
            <source src="" type="video/mp4"/>
          </video>
        </div>
      </div>


      <ProfileOffCanvas path={path}/>
    </>
  )
}



export default MainContent