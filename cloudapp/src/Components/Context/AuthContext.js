import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../../firebase'
import {createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext()
    
export function useAuth(){
    return useContext(AuthContext)
}

const AuthProvider= ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user)=> {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, []);


    const value = {
        currentUser,
        signUp
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider