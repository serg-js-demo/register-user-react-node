import React from "react";
import { Link } from "react-router-dom";
import useAuth from "hooks/useAuth";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </li>
        {user && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              User
            </Link>
          </li>
        )}
      </div>
      {user ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {user.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logout}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Sign In
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default React.memo(NavBar);
