import React from "react";
import { MemoryRouter } from "react-router-dom";
import "./App.css";
import Lists from "./components/lists";

function App() {
  return (
    <MemoryRouter initialEntries={["/lists", "/todos"]} initialIndex={0}>
      <div className="App">
        <Lists />
      </div>
    </MemoryRouter>
  );
}

export default App;
