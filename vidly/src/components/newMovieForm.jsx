import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class NewMovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.String()
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"), //.valid("a", "b", "c")
    numberInStock: Joi.number().required().min(0).label("Number In Stock"),
    rate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  doSubmit = () => {
    // call the server, save, redirect
    console.log("Submitted");
    const new_movies = this.state.movies;
    console.log(this);
    // this.setState({ movies: new_movies });
  };

  render() {
    return (
      <div>
        <h1>Movie Form dsadsa</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre", "Genre")}
          {this.renderInput("numberInStock", "NumberInStock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
