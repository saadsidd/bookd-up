import React, { useState, useContext } from "react";
import "./styles/create.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Create() {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const { user } = useContext(UserContext);


  const navigate = useNavigate();

  const create = () => {
    axios
      .post("/api/clubs", {
        user_id: user.id,
        name: clubName,
        description: clubDescription,
        private: false
      })
      .then((res) => {
        console.log("Create club",res)
        navigate("/profile");
      });
  };

  return (
    <section className="create-section">
      <div className="create-header-box">
        <h1 className="create-header">Create a BookClub!</h1>
      </div>

      <div className="form-box">
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-container">
            <input
              type="text"
              name="name"
              placeholder="Name Your BookClub."
              onChange={(e) => {
                setClubName(e.target.value);
              }}
            ></input>
          </div>

          <div className="form-container">
            <textarea
            className="textarea"
              type="text"
              name="description"
              placeholder="What Is Your BookClub About?"
              onChange={(e) => {
                setClubDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </form>

        <button onClick={create} type="submit" className="create-btn">
          Create Club!
        </button>
      </div>
    </section>
  );
}
