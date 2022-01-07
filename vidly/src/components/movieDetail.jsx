import React, { Component } from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";

class MovieDetails extends Component {
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
    if (cur_id === "new") return;

    const cur_movie = getMovie(cur_id);
    if (!cur_movie) return this.props.history.replace("/not-found");

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

  handleSave = () => {
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form </h1>

        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default MovieDetails;
