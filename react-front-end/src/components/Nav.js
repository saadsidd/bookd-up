import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./styles/Nav.scss";

export default function Nav() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("current_user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-bar__logo">BOOK'D UP</Link>

      <div className="nav-bar__links">
        <Link to="/" className="nav-bar__item">Home</Link>
        <Link to="/search" className="nav-bar__item">Search</Link>
        <Link to="/match" className="nav-bar__item">MatchBook<span className="nav-bar__fire-emoji">🔥</span></Link>
        {user ? (
          <Link to="/profile" className="nav-bar__item">My Profile</Link>
        ) : (
          <Link to="/signup" className="nav-bar__item">Sign Up</Link>
        )}
        {user ? (
          <button onClick={logout} type="submit" className="login-btn">Logout</button>
        ) : (
          <Link to="/login" className="nav-bar__item">Login</Link>
        )}
      </div>
    </nav>
  );
}