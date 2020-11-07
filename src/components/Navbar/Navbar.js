import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../_actions/types';
const Navbar = () => {
  const [navbarFixedPosition, fixNavbarOnScroll] = useState(false);
  const handleNavbarPosition = e => {
    const offset = window.scrollY;
    if (offset > 70) {
      fixNavbarOnScroll(true)
    }else{
      fixNavbarOnScroll(false)
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleNavbarPosition);
  });
  return ( 
    
      <nav className={`navbar ${ navbarFixedPosition ? 'fixed' : ''}`}>
        <input type="checkbox" id="toggle-nav-menu" />
        <div className="navbar-container">
          <Link className="logo" to="/">
            <span className="logo-icon fas fa-stream fa-2x" />
            <span className="logo-name"> { APP_NAME } </span>
          </Link>

          <label htmlFor="toggle-nav-menu" className="menu-icon">
            <span className="fa fa-bars fa-2x" />
          </label>
          <div className="navlinks">
            <Link to="/showcase" className="nav-item"> Showcase </Link>
            <Link to="/login" className="nav-item"> Login </Link>
            {/* <Link to="#our-works" className="nav-item"> Solutions </Link>
            <Link to="#contact" className="nav-item"> Contact </Link> */}

            <Link to="/signup/sme" className="nav-item navbar-cta"> Signup </Link>

          </div>
        </div>
      </nav>
   );
}
 
export default Navbar;