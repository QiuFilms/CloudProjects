import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import folder from "../Images/folder.png"
import file from "../Images/file.png"

const MainContent = () => {
  const [dirs, setDirs] = useState([]);
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState("asd");
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
}, []);

useEffect(() => {
  getFiles(path);
}, []);






  return (
    <>
      <div className="d-flex">
        {Object.keys(dirs).map(item => (
            <div key={item} className="default">
              <img src={folder}/>
              <p>{dirs[item]}</p>
            </div>
            ))}

        {Object.keys(files).map(item => (
            <div key={item} className="default">
              <img src={file}/>
              <p>{files[item]}</p>
            </div>
            ))}
      </div>
    </>
  )
}

export default MainContent