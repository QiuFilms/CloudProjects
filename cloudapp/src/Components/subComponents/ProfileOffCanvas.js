import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const ProfileOffCanvas = (props) => {
  const [size, setSize] = useState([]);

  useEffect(() => {
    const maxSize= 1*1073741824
    const getSize = async (url) =>{
      try { 
        const response = await fetch(`http://89.74.117.156:5000/size?user=${url}`);
        const jsonData = await response.json();
  
        const percent = Math.round((jsonData/maxSize) * 100) / 100*100
        setSize(percent)
      } catch (err) {
        console.error(err.message);
      }
    }
    getSize(props.path)
  }, [props.path])
  return (
    <>
      <div className="offcanvas offcanvas-end"  data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">Profile</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
          Used space:
            <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{width:size+"%"}} aria-valuenow={size} aria-valuemin="0" aria-valuemax="100">{size+"%"}</div>
            </div>
          </div>
        </div>
      </div>    
    </>
  )
}

export default ProfileOffCanvas
