import React from "react";
import { Link } from "react-router-dom";
import './styles/ClubCard.scss';

export default function ClubCard(props) {

  const { imageURL, name, memberCount, description, id } = props;

  return (
    <div className="club-card__container">
      <img className="club-card__image" src={imageURL} alt="Bookclub" />
      <div className="club-card__info">
        <div className="club-card__name">{name}</div>
        <div className="club-card__member-count">{memberCount} member{memberCount !== '1' && 's'}</div>
        <p className="club-card__description">{description}</p>
        <Link className="club-card__link" to={`/club/${id}`}>Visit the club!</Link>
      </div>
    </div>
  );
}