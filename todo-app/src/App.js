import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import "./App.css";
import Lists from "./components/lists";

function App() {
  return (
    <MemoryRouter initialEntries={["/lists"]}>
      <div className="App">
        <Route path={"/lists"} component={Lists} />
      </div>
    </MemoryRouter>
  );
}

export default App;
