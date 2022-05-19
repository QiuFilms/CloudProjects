import React from 'react'
import Header from './subComponents/Header'

const Menu = () => {
  return (
    <>
      <Header/>
      <div className="mt-5 w-25 p-5 d-flex flex-column m-auto bg-light">
        <h1 className="text-center">Join now</h1>
        <a className="btn btn-primary" href="/login" role="button">Login</a>
        <a className="btn btn-secondary mt-2" href="/register" role="button">Register</a>
      </div>
    </>
  )
}

export default Menu