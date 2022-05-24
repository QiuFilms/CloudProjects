import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthContext'
const Header = () => {
  const { currentUser, logOut } = useAuth()
  
  async function handleLogOut(){
    await logOut()
  }

  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><i className="fa fa-cloud"></i> CloudStorage</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {currentUser &&
            <>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="home">Home</a>
              </li> 
              
              <li className="nav-item">
                <a className="nav-link">Limits</a>
              </li>
              <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                <a className="nav-link">Profile</a>
              </li>
            </>
            }
          </ul>
          {currentUser &&
              <button className="btn btn-primary ms-auto" type="button" onClick={handleLogOut}>Logout</button>
          }
        </div>
      </div>
    </nav>
  </>
  )
}

export default Header