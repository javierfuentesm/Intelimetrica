import React from "react";
import Home from "./Components/Home";
import Header from "./Components/Header";
import MapPage from './Components/MapPage';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route  path="/map" exact>
          <MapPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
