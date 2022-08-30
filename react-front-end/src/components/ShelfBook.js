import React from "react";
import './styles/ShelfBook.scss';

export default function ShelfBook(props) {

  const { thumbnail, title, year, author, selfLink, setBookSelfLink } = props;

  return (
    <div className="shelf-book__container" onClick={() => setBookSelfLink(selfLink)}>
      <img src={thumbnail} alt="Book Cover" />
      <div className="shelf-book__info">
        <div><b>{title}</b></div>
        <div>{year}</div>
        <div>{author}</div>
      </div>
    </div>
  );
  
}