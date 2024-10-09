import React from 'react';
import "../../assets/AdminCSS/adminLogin.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BACKEND_URL } from '../../Util/Config';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../Redux/adminSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    try {

      const response = await axios.post( `${BACKEND_URL}/admin/login`,JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(response.data?.success){
        console.log('res: ', response.data)
        localStorage.setItem("adminJWT", response?.data?.adminJWT);

        dispatch(loginAdmin())

        setTimeout(() => navigate("/admin/dashboard"), 200);
      } else {
        // Show alert if login is not successful but no error thrown
        Swal.fire({
          title: "Invalid Credentials!",
          text: "Please check your email and password.",
          icon: "warning",
          confirmButtonText: "Try Again",
        });
      }

    } catch (error) {
      console.log(error.message);

      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

  return (
    <div className="admin-login-container">
      <h1 className="admin-login-title">Admin Login</h1>
      <form className="admin-login-form" onSubmit={handleSubmit(formSubmit)}>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            {... register("email", {required: true})}
          />
          {errors.email && (
              <span className='error-text'>Email is required</span>
            )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            {... register("password", {required: true})}
          />
          {errors.password && (
              <span className='error-text'>Password is required</span>
            )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
