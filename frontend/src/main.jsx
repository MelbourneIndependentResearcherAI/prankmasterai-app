import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "20px", fontSize: "20px" }}>
      <p>Temporary app shell.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
