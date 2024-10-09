import React from 'react';
import '../../assets/AdminCSS/adminHeader.css'

function AdminHeader() {
  return (
    <div className="admin-header">
      <h1 className="header-title">Dashboard</h1>
      <button className="logout-btn">Logout</button>
    </div>
  );
}

export default AdminHeader;

