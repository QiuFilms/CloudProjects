import React, {useRef} from 'react'
import Header from './Header'

const LoginForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  return (
    <>
      <Header/>
      <div className="w-25 p-3 m-auto mt-5">
        <h3>Login</h3>
        <hr/>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Username"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password"/>
        </div>
        <button type="button" className="btn btn-info float-end">Login</button>
      </div>
    </>
  )
}

export default LoginForm