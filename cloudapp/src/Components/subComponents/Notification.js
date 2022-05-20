import React from 'react'
import folder from "../Images/folder.png"
import success from "../Images/success.png"
import close from "../Images/close.png"

const Notification = () => {

  return (
    <>
        <button type="button" className="btn btn-primary" id="liveToastBtn">Show live toast</button>

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
            <img src={success} className="rounded me-2" alt="..." style={{maxHeight: "25px"}}/>
            <strong className="me-auto">Notfication</strong>
            <small>Now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                Folder successfuly created
            </div>
        </div>
        </div>
    </>
  )
}

export default Notification