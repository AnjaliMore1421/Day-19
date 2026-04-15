import React from "react";
import { List } from "react-window";

// Row component
const RowComponent = ({ index, style }) => {
  return (
    <div
      style={{
        ...style,
        padding: "8px",
        borderBottom: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    >
      Item Number {index + 1}
    </div>
  );
};

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Virtualized List Rendering</h2>

      <List
        rowComponent={RowComponent}
        rowCount={1000}
        rowHeight={40}
        rowProps={{}}
        style={{
          height: 400,
          width: 300,
          border: "1px solid black",
        }}
      />
    </div>
  );
}

export default App;
