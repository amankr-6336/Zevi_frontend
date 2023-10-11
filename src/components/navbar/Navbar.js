import React from 'react'
import './Navbar.scss'
import logo from '../../assets/images.png'

function Navbar() {
  return (
    <nav className='navbar'>
       <div className="inner_navbar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
       </div>
    </nav>
  )
}

export default Navbar