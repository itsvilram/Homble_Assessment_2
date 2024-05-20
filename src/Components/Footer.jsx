import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
       <div className="Footer-logo">
       <img src={`${process.env.PUBLIC_URL}/assets/logo_green.png`} alt="Logo" />
        <p>HOMBLE</p>
       </div>
       <ul className="footer-links">
        <li>Company</li>
        <li>Product</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contect</li>
       </ul>
    </div>
  )
}
export default Footer