import React from "react";
import './styles/BookCard.scss';

export default function BookCard(props) {

  const { thumbnail, title, year, author, selfLink, setBookSelfLink } = props;

  return (
    <div className="book-card-container" onClick={() => setBookSelfLink(selfLink)}>
      <img className="book-card-image" src={thumbnail} alt="Result Book"/>
      <div className="book-card-details-box">
        <div className="book-card-title">
          <b>{title}</b>
        </div>
        <div className="book-card-year">
          {year}
        </div>
        <div className="book-card-author">{author}</div>
      </div>
    </div>
  );
}