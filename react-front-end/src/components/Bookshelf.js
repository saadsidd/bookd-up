import React from "react";
import './Bookshelf.scss';

export default function Bookshelf(props) {

  const { label } = props;

  return (
    <div className="shelf__container--outer">
      <div className="shelf__container--inner">
        <div className="shelf">
          <div className="shelf__wall shelf__wall--back">back</div>
          <div className="shelf__wall shelf__wall--right">right</div>
          <div className="shelf__wall shelf__wall--left">left</div>
          <div className="shelf__wall shelf__wall--top">top</div>
          <div className="shelf__wall shelf__wall--bottom">bottom</div>
        </div>
      </div>
      <div className="shelf__label">{label}</div>
    </div>
  );

}