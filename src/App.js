import Home from "./pages/Home";
import Title from "./pages/Title";
import "./styles/App.scss";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App"></div>

      <Switch>
        <Route exact path="/video-app">
          <Title />
        </Route>
        <Route path="/video-app/library">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
