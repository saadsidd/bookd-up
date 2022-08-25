import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles/main.scss";


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
    return clubs.map((club) => {
      return (
        <div key={club.id} className="popular-bookclubs-card">
            <img className="club-image"
              src={club.image_url || "images/default-club.png"}
              alt="Default"
              />
            <div className="club-info"> 
              <h3>{club.name}</h3>
              <p>{club.description}</p>
              <p>{club.member_count} members</p>
              <Link className="club-link" to={`/club/${club.id}`}>Visit The Club!</Link>
            </div>
        </div>
      );
    });
  };

  return (
    <section className="main-contianer">
      <div className="content">
        <div className="hero-section">
          <div className="hero-header-box">
            <h1 className="hero-header">A Book Lovers Hub</h1>
          </div>

          <div className="hero-text-box">
            <span className="hero-text">
              Love books? So do we! With Book'd Up you can build your own virtual
              bookshelves by using our awesome search tool. If you don't know what
              you're in the mood to read, checkout Matchbook and match with a book
              based on your preferences. You can also make and join bookclubs with
              fellow readers!
            </span>
          </div>
          <div className="cta-box">
            <button onClick={signup} className="cta-button">
              Start a Bookclub
            </button>
          </div>
        </div>
        <div className="hero-image-box">
          <div className="blob"></div>
        </div>
      </div>

      <div className="popular-bookclubs-section">
        <h2 className="popular-bookclubs-header">Bookclubs</h2>
        <div className="popular-bookclubs-container">
          {clubs && getClubs(clubs)}
        </div>
      </div>
    </section>
  );
}
