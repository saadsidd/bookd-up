import React from "react";
import './styles/Bookshelf.scss';
import BookLoader from './BookLoader';

export default function Bookshelf(props) {

  const { label, isLoading, books } = props;

  return (
    <div className="shelf__container--outer">
      <div className="shelf__container--inner">
        <div className="shelf__books-holder">
          {isLoading && <div className="shelf__loader-container"><BookLoader /></div>}
          {!isLoading && books}
        </div>
        <div className="shelf">
          <div className="shelf__wall shelf__wall--back"></div>
          <div className="shelf__wall shelf__wall--right"></div>
          <div className="shelf__wall shelf__wall--left"></div>
          <div className="shelf__wall shelf__wall--top"></div>
          <div className="shelf__wall shelf__wall--bottom"></div>
        </div>
      </div>
      <div className="shelf__label">{label}</div>
    </div>
  );

}