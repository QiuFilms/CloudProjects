import React from 'react'
import Header from './Header'

const LoginForm = () => {
  return (
    <>
      <Header/>
      <div className="w-25 p-3 m-auto mt-5">
        <h3>Login</h3>
        <hr/>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Username"/>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password"/>
        </div>
        <button type="button" class="btn btn-info float-end">Login</button>
      </div>
    </>
  )
}

export default LoginForm