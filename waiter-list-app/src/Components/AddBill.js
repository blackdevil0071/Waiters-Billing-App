import React, { useState, useEffect } from "react";
import ListBill from "./ListBill";

function AddBill() {
  const initialFormData = {
    uniqueId: "",
    price: "",
    item: "",
    selectedTable: "Table 1",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("bill")) || []
  );

  useEffect(() => {
    setStoredData(JSON.parse(localStorage.getItem("bill")) || []);
  }, []);

  const updateLocalStorageAndData = (updatedData) => {
    localStorage.setItem("bill", JSON.stringify(updatedData));
    setStoredData(updatedData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formData.uniqueId <= 0 || formData.price <= 0) {
      alert(
        `Please enter values greater than 0 for ${formData.uniqueId} and ${formData.price}.`
      );
      return;
    } else if (formData.item.length === 0) {
      alert("Enter Item ");
      return;
    }

    const newData = {
      uniqueId: formData.uniqueId,
      price: formData.price,
      item: formData.item,
      selectedTable: formData.selectedTable,
    };

    const updatedBill = [...storedData, newData];
    updateLocalStorageAndData(updatedBill);
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleInputChanges = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTableChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedTable: event.target.value,
    }));
  };

  const handleDelete = (table, uniqueId) => {
    const updatedList = storedData.filter(
      (bill) => !(bill.selectedTable === table && bill.uniqueId === uniqueId)
    );
    updateLocalStorageAndData(updatedList);
  };

  return (
    <React.Fragment>
      <h2>Waiters App</h2>
      <form style={formStyles} onSubmit={handleFormSubmit}>
        <label style={labelStyles}>uniqueId</label>
        <input
          style={inputStyles}
          type="number"
          name="uniqueId"
          value={formData.uniqueId}
          onChange={handleInputChanges}
        />
        <label style={labelStyles}>Price</label>
        <input
          style={inputStyles}
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChanges}
        />
        <label style={labelStyles}>Item</label>
        <input
          style={inputStyles}
          type="text"
          name="item"
          value={formData.item}
          onChange={handleInputChanges}
        />
        <label style={labelStyles}>Choose a table</label>
        <select
          style={selectStyles}
          name="selectedTable"
          value={formData.selectedTable}
          onChange={handleTableChange}
        >
          <option>Table 1</option>
          <option>Table 2</option>
          <option>Table 3</option>
        </select>
        <button type="submit" style={buttonStyles}>
          Add to Bill
        </button>
      </form>
      <ListBill
        list={storedData}
        onDelete={handleDelete}
        options={["Table 1", "Table 2", "Table 3"]}
      />
    </React.Fragment>
  );
}

export default AddBill;

const formStyles = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "300px",
  alignItems: "center", // Center horizontally
  justifyContent: "center",
  margin: "20px auto",
};

const labelStyles = {
  marginBottom: "5px",
};

const inputStyles = {
  marginBottom: "10px",
  padding: "5px",
};

const selectStyles = {
  marginBottom: "10px",
  padding: "5px",
};

const buttonStyles = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
