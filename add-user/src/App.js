import "./App.css";
import React, { useState } from "react";
import Parent from "./Parent";
import List from "./List";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => [
      ...prevUsersList,
      { name: uName, age: uAge },
    ]);
  };

  return (
    <div>
      <div className="app-form">
        <Parent onAddUser={addUserHandler} />
        <List users={usersList} />
      </div>
      
    </div>
  );
}

export default App;
