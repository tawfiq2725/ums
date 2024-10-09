import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './UserPages/LoginPage'
import SignupPage from './UserPages/SignupPage'
import HomePage from './UserPages/HomePage'
import UserProtectedRoute from '../Components/ProtectedRoutes/UserProtectedRoute'
import AdminLoginPage from './AdminPages/AdminLoginPage'
import DashBoardPage from './AdminPages/DashBoardPage'
import EditPage from './AdminPages/EditPage'
import AddUserPage from './AdminPages/AddUserPage'
import AdminProtectedRoute from '../Components/ProtectedRoutes/adminProtectedRoute'

function Body() {

    const appRouter = createBrowserRouter([
        //user Router
        {
            path: '/',
            element: <LoginPage />
        },
        {
            path: '/signup',
            element: <SignupPage />
        },
        {
            path: '/user/home',
            element: ( 
                <UserProtectedRoute>
                    <HomePage /> 
                </UserProtectedRoute>
                ),
        },

        //Admin Routes
        {
          path: '/admin',
          element: <AdminLoginPage />
        },
        {
          path: '/admin/dashboard',
          element: ( 
            <AdminProtectedRoute>
              <DashBoardPage />
            </AdminProtectedRoute>
         )
        },
        {
          path: '/admin/editUser',
          element: (
          <AdminProtectedRoute>
            <EditPage />
            </AdminProtectedRoute>
            )
        },
        {
          path:'/admin/addUser',
          element: (
          <AdminProtectedRoute>
            <AddUserPage />
            </AdminProtectedRoute>
            )
        }
    ])

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
