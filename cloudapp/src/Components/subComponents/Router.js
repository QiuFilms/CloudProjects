import React from 'react'
import Main from '../Main';
import Menu from '../Menu';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '../Context/AuthContext';

const RouteSwitch = () => {
    const {currentUser} = useAuth()
    console.log(currentUser)
    return (
    <>
        <Routes>
            <Route path="*" element={<Navigate to="/" replace={true} />}/>
            {currentUser &&
            <>
                <Route path="/" element={<Menu/>} />
                <Route path="home" element={<Main />} />
                <Route path="login" element={<Navigate to="/home" replace={true} />}/>
                <Route path="register" element={<Main />} />
            </>

            }
             {!currentUser &&
            <>
                <Route path="/" element={<Menu/>} />
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
            </>
            }
        </Routes>
    </>
  )
}

export default RouteSwitch