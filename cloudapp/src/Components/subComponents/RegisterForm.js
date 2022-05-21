import React, {useRef, useState} from 'react'
import Header from './Header'
import { useAuth } from './AuthContext'

const RegisterForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault()
    if(passwordConfirmRef.current.value !== passwordConfirmRef.current.value){
      return setError("Passwords do not match")
    }

    try {
      setError('')
      setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
    } catch(err) {
      console.log(err)
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  return (
    <>
        <Header/>

        <div className="w-25 p-3 m-auto mt-5">
        <h3>Register</h3>
        <hr/>
        {<p>{currentUser.email}</p>}
        {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" ref={emailRef} required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password" ref={passwordRef} required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Confirm password</label>
                <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Confirm password" ref={passwordConfirmRef} required/>
            </div>
            <button type="submit" className="btn btn-info float-end" disabled={loading}>Register</button>
          </form>
        </div>

    </>
  )
}

export default RegisterForm