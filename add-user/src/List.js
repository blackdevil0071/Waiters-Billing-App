import React from "react";
import "./List.css";

export default function List(props) {
  return (
    <ul>
      {props.users.map((user, index) => (
        <li key={index}>
          {user.name} - {user.age} years old
        </li>
      ))}
    </ul>
  );
}
