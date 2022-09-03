import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./styles/main.scss";
import ClubCard from "../components/ClubCard";


export default function MainPage() {
  const [clubs, setClubs] = useState();

  const navigate = useNavigate();
  const signup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    axios.get(`/api/clubs`)
    .then((res) => {
      setClubs(res.data.clubs);
    });
  }, []);

  const getClubs = (clubs) => {
    return clubs.map(club => {
      return (
        <ClubCard
          key={club.id}
          id={club.id}
          imageURL={club.image_url || "images/default-club.png"}
          name={club.name}
          memberCount={club.member_count}
          description={club.description}
        />
      );
    });
  };

  return (
    <div className="main__container">
      <div className="main__banner">

        <div className="main__banner--left">
          <h1 style={{fontSize: '45px'}}>A Book Lover's Hub</h1>
          <div className="main__banner-text">
            Love books? So do we! With Book'd Up you can build your own virtual
            bookshelves by using our awesome search tool. If you don't know what
            you're in the mood to read, checkout Matchbook and match with a book
            based on your preferences. You can also make and join bookclubs with
            fellow readers!
          </div>
          <Button text="Start a Bookclub" handleClick={signup} />
        </div>

        <div className="main__banner--right">
          <img className="main__banner-image" src="images/main-banner-image.png" alt="Main Banner"/>
        </div>

      </div>

      <div className="main__bookclubs-container">
        <h1>Bookclubs</h1>
        <div className="main__bookclubs">
          {clubs && getClubs(clubs)}
        </div>
      </div>
    </div>
  );
}
