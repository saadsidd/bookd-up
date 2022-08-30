import React from "react";
import './styles/Bookshelf.scss';
import Spinner from "./Spinner";

export default function Bookshelf(props) {

  const { label, isLoading, books } = props;

  return (
    <div className="shelf__container--outer">
      <div className="shelf__container--inner">
        <div className="shelf__books-holder">
          {isLoading && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}><Spinner /></div>}
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