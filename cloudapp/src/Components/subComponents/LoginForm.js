import React, { useRef, useState } from 'react'
import Header from './Header'
import { useAuth } from '../Context/AuthContext'
import  { Navigate  } from 'react-router-dom'


const LoginForm = () => {
  const [error, setError] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const {logIn} = useAuth()
  const [status, setStatus] = useState(false)

  async function handleLogiIn(e){
    e.preventDefault()
    console.log(123)
    try {      
      setError(false)
      await logIn(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      console.log(error)
      setError("Wrong email or password")
      return
    }
    console.log(4342)
    setStatus(true)
  }

  return (
    <>
      {status && (
          <Navigate to="/home" replace={true} />
      )}

      <Header/>
      <div className="w-25 p-3 m-auto mt-5">
        <h3>Login</h3>
        <hr/>

        {error && 
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        }
        <form onSubmit={handleLogiIn}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control"placeholder="Email" ref={emailRef}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control"  placeholder="Password" ref={passwordRef}/>
          </div>
          <button type="submit" className="btn btn-info float-end">Login</button>
        </form>
      </div>
    </>
  )
}

export default LoginForm