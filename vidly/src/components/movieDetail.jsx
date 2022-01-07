import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
class MovieDetails extends Component {
  state = {
    movies: [],
    allGenres: [], // we init a place holder here and init it in did mount.
    // pageSize: 4,
    // currentPage: 1,
    // sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), allGenres: genres });
  }

  handleSave = () => {
    this.props.history.push("/movies");
  };

  render() {
    console.log("aaa");
    // console.log(this);
    const cur_id = this.props.match.params.id;
    // console.log(cur_id);
    const cur_movie = this.state.movies.filter((m) => m._id == cur_id)[0];
    console.log("ok");
    console.log(cur_movie);
    this.setState(cur_movie);
    console.log(this.state);
    return (
      <div>
        <h1>Movie Form </h1>
        {this.renderInput("title", "Title")}
        {this.renderInput("genre", "Genre", "Genre")}
        {this.renderInput("numberInStock", "NumberInStock", "number")}
        {this.renderInput("rate", "Rate", "number")}
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default MovieDetails;
