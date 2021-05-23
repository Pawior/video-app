import Home from "./pages/Home";
import Title from "./pages/Title";
import "./styles/App.scss";
import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router basename="/">
      <div className="App"></div>

      <Switch>
        <Route exact path="/">
          <Title />
        </Route>
        <Route path="/library">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
