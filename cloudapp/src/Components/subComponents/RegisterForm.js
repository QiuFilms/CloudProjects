import React, {useRef, useState} from 'react'
import Header from './Header'
import { useAuth } from '../Context/AuthContext'
import { auth, db } from '../../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import {onAuthStateChanged } from "firebase/auth";
import  { Navigate  } from 'react-router-dom'

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
      onAuthStateChanged(auth, (user) => {
        console.log(user.uid)
          createDoc(user.uid);
          createHomeDir(user.uid);
      })

    } catch (error) {
      console.log(error)
      return
    }
    console.log(4342)
    return <Navigate  to='/home'  />


    async function createDoc(userUid){
      await setDoc(doc(db, "UsersLimits", userUid), {
        limit: 5
      });
    }

    async function createHomeDir(userUid){
      console.log(123123123)
      const response = await fetch(`http://localhost:5000/createFolder?user=${userUid}`)
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
        {error && 
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        }
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