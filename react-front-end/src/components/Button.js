import React from "react";
import './styles/Button.scss';

export default function Button(props) {

  const { text, handleClick } = props;

  return (
    <button className="button" onClick={handleClick}>
      {text}
    </button>
  );
}