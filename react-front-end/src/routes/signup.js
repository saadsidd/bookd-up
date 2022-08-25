import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/signup.scss";

export default function SignUp() {
  const [emailAtReg, setEmailAtReg] = useState("");
  const [passwordAtReg, setPasswordAtReg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const register = () => {
    axios.post("/api/users", {
      email: emailAtReg,
      password: passwordAtReg,
      first_name: firstName,
      last_name: lastName,
    })
      .then((res) => {
        setUser(res.data.user);
        navigate("/profile");
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  };

  return (
    <section className="sign-up-section">
      <div className="sign-up-header-box">
        <h1 className="sign-up-header"> Sign Up</h1>
      </div>

      <div className="form-box">
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-container">
            <input
              className="sign-up-input"
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
          </div>

          <div className="form-container">
            <input
              className="sign-up-input"
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></input>
          </div>

          <div className="form-container">
            <input
              className="sign-up-input"
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmailAtReg(e.target.value);
              }}
            ></input>
          </div>

          <div className="form-container">
            <input
              className="sign-up-input"
              type="password" 
              name="password" 
              placeholder="Password"
              onChange={(e) => {
                setPasswordAtReg(e.target.value);
              }}
            ></input>
          </div>
        </form>

        <button onClick={register} className="signup-btn">
          {" "}
          Sign Up
        </button>
      </div>
    </section>
  );
}
