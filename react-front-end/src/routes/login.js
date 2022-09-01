import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Button from "../components/Button";
import "./styles/login.scss";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const login = () => {
    axios.post("/api/users/login", {
      email: email, 
      password: password,
    })
    .then((res) => { 
      setUser(res.data.user);
      navigate("/profile");
    });
  };

  return (
    <div className="login__container">
      <h2>Login</h2>
      
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          <input
            className="login__input"
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={event => {
              setEmail(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            className="login__input"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={event => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>
      </form>

      <Button text="Login" handleClick={login} />
    </div>
  );
};