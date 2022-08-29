import React from "react";
import './Bookshelf.scss';
import Spinner from "./Spinner";

export default function Bookshelf(props) {

  const { label, isLoading } = props;

  return (
    <div className="shelf__container--outer">
      <div className="shelf__container--inner">
        <div className="shelf__books-holder">
          {isLoading && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}><Spinner /></div>}
        </div>
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