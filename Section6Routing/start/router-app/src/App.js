import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Switch>
            {/* when using switch, do it from the most specific ones to the most general ones. */}
            <Route path="/products" component={Products}></Route>
            <Route path="/posts" component={Posts}></Route>
            <Route path="/admin" component={Dashboard}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
