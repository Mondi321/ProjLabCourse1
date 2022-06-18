import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './footer.css';

export default function Footer() {
  return (
        <div id="footer">
            <h1><span>SONA</span> RESTAURANT</h1>
            <hr />
            <div className="footerInfo">
                <div className='footer1'>
                    <h6>Account</h6>
                    <p>Login</p>
                    <p>Sign up</p>
                </div>
                <div className='footer2'>
                    <h6>Contact</h6>
                    <p>Home</p>
                    <p>Reservation</p>
                </div>
            </div>
            <div className="social-media">
                <FaFacebook className='facebook'/>
                <FcGoogle />
                <FaInstagram className='instagram' />
            </div>
        </div>
  )
}
