import React, {useRef, useState} from 'react'
import Header from './Header'
import { useAuth } from '../Context/AuthContext'
import { db } from '../../firebase'
import { doc, setDoc } from "firebase/firestore"; 

const RegisterForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signUp, currentUser } = useAuth()
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
      console.log(error)
      setLoading(false)
      return setError("Failed to create an account")
    }

    try {
      await createDoc()
      await createHomeDir()
    } catch (error) {
      console.log(error)
    }


    async function createDoc(){
      await setDoc(doc(db, "UsersLimits", await currentUser.uid), {
        limit: 5
      });
    }

    async function createHomeDir(){
      console.log(123123123)
      const response = await fetch(`http://localhost:5000/createFolder?user=${await currentUser.uid}`)
      const jsonData = await response.json();
      console.log(jsonData)
    };
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
              <label className="form-label">Password</label>
              <input type="password" className="form-control"  placeholder="Passoword" required ref={passwordRef}/>
          </div>
          <div className="mb-3">
              <label className="form-label">Confirm password</label>
              <input type="password" className="form-control" placeholder="Confirm password" required ref={passwordConfirmRef}/>
          </div>
          <button type="submit" className="btn btn-info float-end" disabled={loading}>Register</button>
        </form>
        </div>
    </>
  )
}

export default RegisterForm