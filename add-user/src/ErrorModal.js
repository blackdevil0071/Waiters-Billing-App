import React from "react";
import "./ErrorModal.css";
export default function ErrorModal(props) {
  return (
    <>
      <div className="error-modal" onClick={props.onConfirm}>
        <header>
          <h2>{props.title}</h2>
        </header>
        <div>
          <p>{props.message}</p>
        </div>
        <footer>
          <button onClick={props.onConfirm}>close</button>
        </footer>
      </div>
    </>
  );
}
