import React from 'react'

const Header = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="localhost:3000"><i className="fa fa-cloud"></i> CloudStorage</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="localhost:3000">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="localhost:3000/server">Server</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Limits</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
  )
}

export default Header