import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
class NewMovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", rate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"), //.valid("a", "b", "c")
    numberInStock: Joi.number().required().min(0).label("Number In Stock"),
    rate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  componentDidMount() {
    // console.log("aaa");
    const genres = getGenres();
    this.setState({ genres });

    const cur_id = this.props.match.params.id;
    if (!cur_id || cur_id === "new") return;

    const cur_movie = getMovie(cur_id);
    if (!cur_movie && cur_id != "new")
      return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(cur_movie) });
    console.log(this);
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      rate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    // call the server, save, redirect
    console.log("Submitted");
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "NumberInStock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
