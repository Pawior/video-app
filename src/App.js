import Home from "./pages/Home";
import "./styles/App.scss";
import React from "react";

function App() {
  console.log(process.env.REACT_APP_GOOGLE_API_KEY);

  return (
    <div className="App">
      <Home> </Home>
    </div>
  );
}

export default App;
