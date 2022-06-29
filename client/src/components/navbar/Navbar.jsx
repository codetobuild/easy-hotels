import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logoutUserURL } from "../../constants/url.constants";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    const logout = async () => {
      try {
        const res = await axios.post(logoutUserURL);
        localStorage.clear();
        // console.log(res.data);
        dispatch({ type: "LOGOUT" });
      } catch (err) {
        console.log(err);
      }
    };
    logout();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <NavLink to="/" className="logo">
          <h1 className="logoText" onClick={() => navigate("/")}>
            Easy Hotels
          </h1>
        </NavLink>
        {user ? (
          <div className="profileWrapper">
            <span className="usernameText">{user.details.username}</span>
            <div className="profileContainer">
              <img
                src="https://randomuser.me/api/portraits/lego/2.jpg"
                alt="profile"
                className="profileImage"
              />
            </div>
            <div>
              <button onClick={handleLogout} className="logoutBtn">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navItems">
            <Link className="navButton" to="/register">
              Register
            </Link>
            <Link className="navButton" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
