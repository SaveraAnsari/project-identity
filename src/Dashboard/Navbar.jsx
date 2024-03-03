import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Nav.css";
import Logo from "../assets/nadra.png";
// import Home from './Home';

const Nav = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">DIGITAL IDENTITY HUB</div>
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard">
              <i className="icon fas fa-home"></i>Home
            </Link>
          </li>
          <li>
            <Link to={"/marriage"}>Marriage</Link>
          </li>
          <li>
            <Link to={"/insurance"}>Insurence</Link>
          </li>
          <li>
            <Link to={"/education"}>Education</Link>
          </li>
          <li>
            <Link to={"/employment"}>Employment</Link>
          </li>
          <li>
            <Link to={"/medical"}>Medical</Link>
          </li>
          <li>
            <Link to={"/travel"}>Travel</Link>
          </li>
          <li>
            <Link to={"/userData"}>Your Data</Link>
          </li>

          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="scroll-watcher"></div>
    </div>
  );
};

export default Nav;
