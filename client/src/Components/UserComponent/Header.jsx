import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/UserCSS/header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'No, stay logged in',
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, remove the token and navigate to the login page
        localStorage.removeItem('userJWT');
        navigate("/");
      }
    });
  };

  return (
    <header className="header">
      <h1>Welcome to Home Page</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
