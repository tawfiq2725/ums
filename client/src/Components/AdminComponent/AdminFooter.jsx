import React from 'react';
import '../../assets/AdminCSS/adminFooter.css'

function AdminFooter() {
  return (
    <div className="admin-footer">
      <p>&copy; {new Date().getFullYear()} Men's Cart. All rights reserved.</p>
    </div>
  );
}

export default AdminFooter;
