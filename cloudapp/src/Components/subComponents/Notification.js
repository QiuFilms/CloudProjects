import React from 'react'
import folder from "../Images/folder.png"
import success from "../Images/success.png"
import failed from "../Images/close.png"
import { useState } from 'react'

const Notification = ({status,msg}) => {
    let img
    if(status=="success"){
        img = success
    }else{
        img = failed
    }


  return (
    <>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
            <img src={img} className="rounded me-2" alt="..." style={{maxHeight: "20px"}}/>
            <strong className="me-auto">Notfication</strong>
            <small>Now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {msg}
            </div>
        </div>
        </div>
    </>
  )
}

export default Notification