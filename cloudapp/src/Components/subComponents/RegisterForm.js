import React, {useRef, useState} from 'react'
import Header from './Header'
import { useAuth } from '../Context/AuthContext'

const RegisterForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signUp } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  async function handleSumbit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
        <Header/>
        <div className="w-25 p-3 m-auto mt-5">
        <h3>Register</h3>
        <hr/>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSumbit}>
          <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control"placeholder="Email address" required ref={emailRef}/>
          </div>
          <div className="mb-3">
              <label className="form-label">Passoword</label>
              <input type="password" className="form-control"  placeholder="Passoword" required ref={passwordRef}/>
          </div>
          <div className="mb-3">
              <label className="form-label">Confirm password</label>
              <input type="password" className="form-control" placeholder="Confirm password" required ref={passwordConfirmRef}/>
          </div>
          <button type="button" class="btn btn-info float-end" disabled={loading}>Register</button>
          </form>
          </div>
    </>
  )
}

export default RegisterForm