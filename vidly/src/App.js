import React, { Component } from "react";
import Movies from "./components/movies";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/common/navbar";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <main className="container">
        <NavBar />
        <Movies />
        <Switch>
          <Route path="/" exact component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default App;
