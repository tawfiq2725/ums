import React from 'react'
import Login from '../../Components/UserComponent/Login'
import { verifyUserJWT } from '../../Util/verifyUserJWT'
import { Navigate } from 'react-router-dom'

function LoginPage() {
  console.log(`**** LoginPage *****`)
  const userLogged = verifyUserJWT()

  return userLogged ? <Navigate to="/user/home" /> : <Login />
}

export default LoginPage
