import React from "react";
import './styles/BookLoader.scss';

export default function BookLoader() {

  return (
    <div className="bl__animation">
      <div className="bl__layer-1">
        <div className="bl__book-cover left"></div>
        <div className="bl__book-cover right"></div>
      </div>
      <div className="bl__layer-2">
        <div className="bl__back-page left"></div>
        <div className="bl__front-page left">
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
        </div>
        <div className="bl__back-page right"></div>
        <div className="bl__front-page right">
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
        </div>
      </div>
      <div className="bl__layer-3">
        <div className="bl__turning-page">
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
          <div className="bl__sentence"></div>
        </div>
      </div>
    </div>
  );
}