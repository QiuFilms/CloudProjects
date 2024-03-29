import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const ProfileOffCanvas = (props) => {
  const [size, setSize] = useState([]);
  const [color, setColor] = useState("black");
  const maxSize= 1*1073741824
  const getSize = async (url) =>{
    try {
      const response = await fetch(`http://localhost:5000/size?user=${url}`);
      const jsonData = await response.json();

      const percent = Math.round((jsonData/maxSize) * 100) / 100*100
      setSize(percent)
      if(percent > 52){
        setColor("white")
      }
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    getSize(props.path)
  }, [props.path])
  return (
    <>
      <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">Profile</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          Account type: 
          <span class="badge text-bg-primary ms-1">Standard</span>
          <div>
          Used space:
            <div className="progress">
              <p style={{color:color}}>{size}%</p>
              <div className="progress-bar" role="progressbar" style={{width:30+"%"}} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>    
    </>
  )
}

export default ProfileOffCanvas
