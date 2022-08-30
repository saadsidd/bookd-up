import React, { useContext } from "react";
import "./styles/Nav.scss";
import { NavLink, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { UserContext } from "../context/UserContext";

export default function Nav() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("current_user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="logo">
        <StyledNavLink to="/">BOOK'D UP</StyledNavLink>
      </div>

      <div className="links">
        <ul>
          <li>
            <StyledNavLink to="/" className="nav-item">
              Home
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/search" className="nav-item">
              Search
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/match" className="nav-item">
              MatchBook<span className="fire-emoji">🔥</span>
            </StyledNavLink>
          </li>
          <li>
            {user ? (
              <StyledNavLink to="/profile" className="nav-item signup">
                My Profile
              </StyledNavLink>
            ) : (
              <StyledNavLink to="/signup" className="nav-item signup">
                Sign Up
              </StyledNavLink>
            )}
          </li>
          <li>
            {user ? (
              <button onClick={logout} type="submit" className="login-btn">
                Logout
              </button>
            ) : (
              <StyledNavLink to="/login" className="nav-item login">
                Login
              </StyledNavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

const StyledNavLink = styled(NavLink)`
  // text-emphasis: none;
  // text-decoration: none;
  // &:hover {
  //   text-emphasis: none;
  text-decoration: none;
  color: black;
  // }
`;
