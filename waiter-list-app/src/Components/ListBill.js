import React from "react";

export default function ListBill(props) {
  const { list, options } = props;

  // Group the bills by table
  const groupedBills = list.reduce((acc, bill) => {
    const { selectedTable, uniqueId, price, item } = bill;
    acc[selectedTable] = acc[selectedTable] || [];
    acc[selectedTable].push({ uniqueId, price, item });
    return acc;
  }, {});

  return (
    <>
      {options.map((table) => (
        <div key={table} style={styles.tableContainer}>
          <h2 style={styles.tableHeader}>{table}</h2>
          {groupedBills[table]?.length > 0 ? (
            // Display bills for the table
            groupedBills[table].map(({ price, item, uniqueId }, index) => (
              <div key={index} style={styles.billContainer}>
                <p style={styles.billText}>
                  {price} - {item}
                  <button
                    style={styles.deleteButton}
                    onClick={() => props.onDelete(table, uniqueId)}
                  >
                    Delete
                  </button>
                </p>
              </div>
            ))
          ) : (
            // Display a message if there are no bills for the table
            <p style={styles.noItemsText}>No items for {table}</p>
          )}
        </div>
      ))}
    </>
  );
}

const styles = {
  tableContainer: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "10px",
    padding: "10px",
  },
  tableHeader: {
    color: "#333",
  },
  billContainer: {
    margin: "5px 0",
  },
  billText: {
    margin: 0,
  },
  deleteButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    background: "#ff5555",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  noItemsText: {
    color: "#777",
  },
};
