import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BACKEND_URL } from "../../Util/Config";
import "../../assets/UserCSS/login.css";
import { loginUser } from "../Redux/userSlice";

function Login() {
  console.log(`**** Login *****`)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, data);

      if (response.data.success) {
        // Store the JWT in localStorage (make sure to store it properly)
        localStorage.setItem("userJWT", response?.data?.userJWT); // Ensure 'userJWT' is the key you're storing

        // Dispatch login action to update state (if using Redux or similar state management)
        dispatch(loginUser());

        // Navigate to user home page immediately
        setTimeout(() => navigate("/user/home"), 3000);
        // Optionally, you can redirect or perform other actions here
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

      // Check for specific error messages from the server response
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <>
      <div className='login-container'>
        <h1 className='login-title'>Login</h1>
        <form className='login-form' onSubmit={handleSubmit(formSubmit)}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            {/* Add register to the input */}
            <input
              type='email'
              name='email'
              id='email'
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className='error-text'>Email is required</span>
            )}
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            {/* Add register to the input */}
            <input
              type='password'
              name='password'
              id='password'
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className='error-text'>Password is required</span>
            )}
          </div>

          <button type='submit' className='login-btn'>
            Login
          </button>
        </form>

        <div className='signup-link'>
          <span>Don't have an account? </span>
          <p className='signup-btn' onClick={() => navigate("/signup")}>
            Sign Up
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
