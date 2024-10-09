import React from 'react';
import "../../assets/AdminCSS/addUser.css"

function AddUser() {
  return (
    <div className="add-user-container">
      <h1 className="add-user-title">Add New User</h1>
      <form className="add-user-form">
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter user name"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter user email"
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter user phone"
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter user password"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-user-btn">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;

