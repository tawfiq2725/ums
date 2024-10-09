import React from 'react';
import '../../assets/UserCSS/footer.css'

function Footer() {
  return (
    <footer className="footer">
      <h1>Footer</h1>
      <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
