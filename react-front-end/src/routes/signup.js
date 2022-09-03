import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
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
      .catch(error => console.log(error));
  };

  return (
    <div className="signup__container">
      <h2>Sign Up</h2>
      
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <input
            className="signup__input"
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={event => {
              setFirstName(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            className="signup__input"
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={event => {
              setLastName(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            className="signup__input"
            type="text"
            name="email"
            placeholder="Email"
            onChange={event => {
              setEmailAtReg(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            className="signup__input"
            type="password" 
            name="password" 
            placeholder="Password"
            onChange={event => {
              setPasswordAtReg(event.target.value);
            }}
          ></input>
        </div>
      </form>

      <Button text="Sign Up" handleClick={register} />
    </div>
  );
}
