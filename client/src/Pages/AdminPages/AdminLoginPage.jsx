import React from 'react'
import AdminLogin from '../../Components/AdminComponent/AdminLogin'
import verifyAdminJWT from '../../Util/verifyAdminJWT'
import { Navigate } from 'react-router-dom'

function AdminLoginPage() {

  const adminLogined = verifyAdminJWT()
  console.log('admiLoggggg: ',adminLogined)

  return adminLogined ? <Navigate to="/admin/dashboard" /> : <AdminLogin />
}

export default AdminLoginPage
