import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { createContext } from 'react'

export const authContext = createContext()

const AuthProvider = () => {

        const login = () =>{
            return signInWithEmailAndPassword
        }
  return (
    <div>AuthProvider</div>
  )
}

export default AuthProvider