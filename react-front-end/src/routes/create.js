import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Button from '../components/Button';
import "./styles/create.scss";

export default function Create() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(null);

  const nameCounter = 50 - name.length;
  const descriptionCounter = 200 - description.length;

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const createClub = () => {
    axios.post("/api/clubs", {
        user_id: user.id,
        name: name,
        description: description,
        private: false,
        image_url: imageURL
      })
      .then(() => navigate("/profile"));
  };

  return (
    <div className="create-club__container">
      <h1>Create a book club!</h1>

      <form className="create-club__form" onSubmit={event => event.preventDefault()}>
        <input
          className="create-club__name"
          type="text"
          name="name"
          maxLength="50"
          placeholder="Name your club"
          onChange={event => setName(event.target.value)}
        ></input>
        <span className={`create-club__input-counter ${nameCounter === 0 && 'max'}`}>{nameCounter}</span>

        <textarea
          className="create-club__description"
          type="text"
          name="description"
          maxLength="200"
          placeholder="What's your club about?"
          onChange={event => setDescription(event.target.value)}
        ></textarea>
        <span className={`create-club__input-counter ${descriptionCounter === 0 && 'max'}`}>{descriptionCounter}</span>

        <input
          className="create-club__image-url"
          type="text"
          name="image-url"
          placeholder="Enter club image URL"
          onChange={event => setImageURL(event.target.value)}
        ></input>
      </form>

      <Button text="Create Book Club" handleClick={createClub} />
    </div>
  );
}
