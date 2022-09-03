import React from "react";
import './styles/BookLoader.scss';

export default function BookLoader() {

  return (
    <div class="bl__animation">
      <div class="bl__layer-1">
        <div class="bl__book-cover left"></div>
        <div class="bl__book-cover right"></div>
      </div>
      <div class="bl__layer-2">
        <div className="bl__back-page left"></div>
        <div class="bl__front-page left">
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
        </div>
        <div className="bl__back-page right"></div>
        <div class="bl__front-page right">
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
        </div>
      </div>
      <div class="bl__layer-3">
        <div class="bl__turning-page">
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
          <div class="bl__sentence"></div>
        </div>
      </div>
    </div>
  );
}