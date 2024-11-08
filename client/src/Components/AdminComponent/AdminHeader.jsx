import React from "react";
import "../../assets/AdminCSS/adminHeader.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../Redux/adminSlice";
import Swal from "sweetalert2";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminJWT");
    dispatch(logoutAdmin());
    Swal.fire({
      title: "Logged Out",
      text: "You have successfully logged out.",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Redirect to login page
    navigate("/admin");
  };

  return (
    <div className="admin-header">
      <h1 className="header-title">Dashboard</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminHeader;
