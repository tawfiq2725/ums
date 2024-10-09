import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../Util/Config";
import "../../assets/UserCSS/signup.css";
import Swal from "sweetalert2";
import { loginUser } from "../Redux/userSlice";

function Signup() {
  console.log(`**** Signup *****`)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, data);

      if (response.data.success) {
        localStorage.setItem("userJWT", response?.data?.userJWT);

        // Dispatch login action to update state (if using Redux or similar state management)
        dispatch(loginUser());

        // Navigate to user home page immediately
        setTimeout(() => navigate("/user/home"), 1000);
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
    <div className='signup-container'>
      <h1 className='signup-title'>Signup</h1>
      <form className='signup-form' onSubmit={handleSubmit(formSubmitHandler)}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            {...register("name", { required: true })}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            {...register("email", { required: true })}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input
            type='tel'
            name='phone'
            id='phone'
            {...register("phone", { required: true })}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            {...register("password", { required: true })}
          />
        </div>

        <button type='submit' className='signup-btn'>
          Signup
        </button>
      </form>
      {/* <p className='login-link' onClick={navigate("/")}>
        Already have an account?
      </p> */}
       <div className='login-link'>
          <span>Don't have an account? </span>
          <p className='login-btn' onClick={() => navigate("/")}>
            Login
          </p>
        </div>
    </div>
  );
}

export default Signup;
