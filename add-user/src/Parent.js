import React, { useState, useRef } from "react";
import "./Parent.css";
import ErrorModal from "./ErrorModal";
import List from "./List";

export default function Parent(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();
  const [users, setUsers] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({ title: "Invalid input", message: "Enter correct input" });
      return;
    }

    if (+enteredAge < 15) {
      setError({ title: "Invalid age", message: "Age must be above 15" });
      return;
    }

    // Update the state with the new user
    setUsers((prevUsers) => [
      ...prevUsers,
      { name: enteredName, age: enteredAge },
    ]);

    // Clear the input after submitting
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input type="text" name="userName" ref={nameInputRef} />
        <label>Age</label>
        <input type="number" name="userAge" ref={ageInputRef} />
        <button type="submit">Add User</button>
      </form>

      {/* Render the List component to display users */}
      <List users={users} />
    </>
  );
}
