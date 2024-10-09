import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/AdminCSS/edit.css'
import axios from 'axios';
import { BACKEND_URL } from '../../Util/Config';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditUser() {

  const { register, handleSubmit, setValue, formState:{errors} } = useForm()

  const location = useLocation()
  console.log('location: ', location)
  const {  username, email, phone, _id } = location.state || {};
  const navigate = useNavigate()

  useEffect(() => {
    setValue('username', username)
    setValue('email', email)
    setValue('phone', phone)
  }, [])

  const formSubmit = async (data) => {
    try {
      
      const response = await axios.put(`${BACKEND_URL}/admin/edit?userId=${_id}`, data)
      if (response.data?.success) {
        await Swal.fire({
          title: 'Success!',
          text: 'User edited successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 2000,
        });
        navigate(`/admin/dashboard`);
      }

    } catch (error) {
      console.log(error);

      Swal.fire({
        title: 'Error!',
        text: 'There was an error editing the user.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="edit-user-container">
      <form
        className="edit-user-form"
        onSubmit={handleSubmit(formSubmit)}
      >
        <h1 className="edit-title">Edit User</h1>

        <div className="form-group">
          <label htmlFor="username">
            Username:
            <input
              type="text"
              className="input-field"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Please valid characters only. [Alphabets A to Z, a to z ]",
                },
                minLength: {
                  value: 5,
                  message: "Enter at least 5 characters",
                },
              })}
            />
          </label>
          <p className="error-message">{errors.username?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              className="input-field"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email id",
                },
                minLength: {
                  value: 11,
                  message: "Enter at least 11 characters",
                },
              })}
            />
          </label>
          <p className="error-message">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone Number:
            <input
              type="number"
              className="input-field"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid phone number",
                },
                minLength: { value: 10, message: "Enter 10 numbers" },
                maxLength: { value: 10, message: "Enter 10 numbers" },
              })}
            />
          </label>
          <p className="error-message">{errors.phone?.message}</p>
        </div>

        <button className="submit-btn" type="submit">
          Edit User
        </button>
      </form>
    </div>
  );
}

export default EditUser;
