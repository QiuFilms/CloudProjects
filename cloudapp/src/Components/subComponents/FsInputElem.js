import React from 'react'
import { createFolder, createFile } from '../Functions/FsOperations'
import { useState } from 'react'


const FsInputElem = ({path,setStatus,setOption,type}) => {
    const [input,setInput] = useState("")


    function handleCreation(){
      if (type=="Dir") {
        createFolder(path,input,setStatus)
      }else{
        createFile(path,input,setStatus)
      }
    }
  return (
    <>
    <div className="position-absolute top-50 start-50 translate-middle border border-dark rounded p-3" onClick={(e) => e.stopPropagation()}>
    <div className="mb-3 input-group-sm">
        <label className="form-label">Create folder</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=> setInput(e.target.value)}/>
        <div id="emailHelp" className="form-text">If you want to create file end it with an extension</div>
    </div>
    <button type="submit" className="btn btn-primary btn-sm" onClick={()=>{handleCreation();setOption(false)}}>Create</button>
    </div>
    </>
  )
}

export default FsInputElem