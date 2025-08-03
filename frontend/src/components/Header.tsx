import React from 'react'

import logo from '../assets/logo/logo.png'

import '../styles/Header.css'

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="NumSense Logo" className="logo" />
      <h1 className="head-title">NumSense</h1>
    </header>
  )
}

export default Header
