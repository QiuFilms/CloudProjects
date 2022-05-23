import React from 'react'
import { useState, useEffect, useRef } from 'react';
import folder from "../Images/folder.png"
import file from "../Images/file.png"
import backArrow from "../Images/arrow.png"
import openFolderListDirs from '../Functions/folderHandler';
import ProfileOffCanvas from './ProfileOffCanvas';
import FsInputElem from './FsInputElem';
import Notification from './Notification';
import { Toast } from 'bootstrap'
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useAuth } from '../Context/AuthContext'

const MainContent = () => {
  const { currentUser } = useAuth()
  const [path, setPath] = useState("123");
  const [dirs, setDirs] = useState([]);
  const [files, setFiles] = useState([]);
  const [menu, setMenu] = useState("none");
  const [position, setPosition] = useState([]);
  const [option, setOption] = useState(false);
  const [status, setStatus] = useState(["none","none"]);
  const video = useRef()
  const uploadedFile = useRef()
  

  const getDirs = async (url) =>{
    try {
      const response = await fetch(`http://localhost:5000/dirs?user=${url}`);
      const jsonData = await response.json();
      console.log(jsonData)
      setDirs(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  }

  const getFiles = async (url) =>{
    try {
      const response = await fetch(`http://localhost:5000/files?user=${url}`);
      const jsonData = await response.json();

      console.log(jsonData)
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
    video.current.style.display ="block"
    video.current.src = fullUrl
  }else{
    video.current.style.display ="none"
  }
}

function backButton(){
  const newPath = path.split("/")
  if(newPath.length > 1){
    newPath.pop()
  }
  console.log(newPath.join("/"))
  setPath(newPath.join("/"))
  getDirs(path)
}

document.addEventListener('click', () =>{
  setMenu("none")
  setOption(false)
});


function contextMenu(e){
  e.preventDefault()
  e.stopPropagation()
  setMenu("block")
  console.log(123)
  const left  = e.clientX  + "px";
  const top  = e.clientY  + "px";
  setPosition([left,top])
};

function stopDef(e){
  e.preventDefault()
}

function showFile(){
  console.log(uploadedFile.current.files[0])
  const reader = new FileReader()

  reader.addEventListener("load", () => {
    async function putFile(base,type){
      console.log(base)
      try {
        const name = uploadedFile.current.files[0].name
        const body = { base, path, name }
        console.log(body)
        const response = await fetch("http://localhost:5000/saveFile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        //const jsonData = await response.json();
        //console.log(jsonData)
      } catch (err) {
        console.error(err.message);
      }
    }
    putFile(reader.result)

  })
  reader.readAsDataURL(uploadedFile.current.files[0])
}

  return (
    <>
    <div id="content" className="user-select-none" onContextMenu={(e) => contextMenu(e)} style={{height:"90vh"}} >
      <button type="button" className="btn btn-info d-flex align-items-center m-2" style={{height:"25px"}} onClick={backButton}>
        <img src={backArrow} style={{maxHeight: "25px"}}></img>
        Back
      </button>
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
    </div>


    <input type="file" id="input" onChange={showFile} ref={uploadedFile}/>

      <div className="offcanvas offcanvas-start w-100 user-select-none" data-bs-backdrop="offcanvas" tabIndex="-1" id="staticBackdropVideo" aria-labelledby="staticBackdropLabel" style={{backgroundColor:"rgba(65, 64, 64, 0.4)"}}>
      <button type="button" className="btn-close btn-close-white ms-auto p-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div className="position-absolute top-50 start-50 translate-middle">
          <video id="videoPlayer" ref={video} controls style={{display:"none",height:"95vh"}}>
            <source src="" type="video/mp4"/>
          </video>
        </div>
      </div>
          {menu!="none" && 
            <div className="position-absolute  user-select-none" style={{left:position[0],top:position[1]}} onContextMenu={(e)=>stopDef(e)}>
              <ul className="list-group" style={{cursor:"pointer"}}>
                <li className="list-group-item list-group-item-action" onClick={(e) => {e.stopPropagation();setOption(true);setMenu("none")}}>Create folder</li>
                <li className="list-group-item list-group-item-action">Create file</li>
              </ul>
            </div>
          }
          
          {option &&
            <FsInputElem path={path} setStatus={setStatus} setOption={setOption}/>
          }

          {status[0] != "none" && 
            new Toast(document.getElementById('liveToast')).show()
          }
      <Notification status={status[0]} msg={status[1]}/>
      <ProfileOffCanvas path={path}/>
    </>
  )
  
}



export default MainContent