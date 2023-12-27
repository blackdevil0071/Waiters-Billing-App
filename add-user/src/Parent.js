import React, { useState, useRef, useEffect } from "react";
import "./Parent.css";
import ErrorModal from "./ErrorModal";
import List from "./List";

export default function Parent(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegenameInputRef = useRef();

  const [error, setError] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // This block of code will run whenever the 'error' state changes
    if (error && error.collegeNameError) {
      console.log("Error related to college name:", error.collegeNameError);
    }
  }, [error]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    const collegeName = collegenameInputRef.current.value;

    if (enteredName.trim().length === 0 || collegeName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({ title: "Invalid input", message: "Enter correct input", collegeNameError: true });
      return;
    }

    if (+enteredAge < 15) {
      setError({ title: "Invalid age", message: "Age must be above 15", collegeNameError: false });
      return;
    }

    // Update the state with the new user
    setUsers((prevUsers) => [
      ...prevUsers,
      { name: enteredName, age: enteredAge, collegeName: collegeName },
    ]);

    // Clear the input after submitting
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    collegenameInputRef.current.value = "";

    // Reset college name error
    setError((prevError) => ({ ...prevError, collegeNameError: false }));
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
        <label>Collegename</label>
        <input type="text" name="collegeName" ref={collegenameInputRef} />
        <button type="submit">Add User</button>
      </form>

      {/* Render the List component to display users */}
      <List users={users} />
    </>
  );
}
