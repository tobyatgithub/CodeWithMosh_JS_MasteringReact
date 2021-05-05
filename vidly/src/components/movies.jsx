import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  constructor() {
    super();
    this.handleDeleter = this.handleDeleter.bind(this);
  }

  handleDeleter = (movie) => {
    // const new_movies = this.state.movies.filter(
    //   (exist_movie) => exist_movie != movie
    // );
    const new_movies = this.state.movies.filter((m) => m._id != movie._id);
    this.setState({ movies: new_movies });
  };

  renderTags() {
    let numOfMovies = this.state.movies.length;
    if (numOfMovies === 0) return <p>There are no movies in the database.</p>;
    return <p>Showing {numOfMovies} movies in the database.</p>;
  }

  renderTableData() {
    return this.state.movies.map((movie) => {
      const {
        _id,
        title,
        genre,
        numberInStock,
        dailyRentalRate,
        publishDate,
      } = movie;

      return (
        <tr key={_id}>
          <td>{title}</td>
          <td>{genre.name}</td>
          <td>{numberInStock}</td>
          <td>{dailyRentalRate}</td>
          <button
            onClick={() => {
              this.handleDeleter(movie);
            }}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </tr>
      );
    });
  }

  render() {
    const { length: numOfMovies } = this.state.movies;
    if (numOfMovies === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
        <p>Showing {numOfMovies} movies in the database.</p>
        <table class="table" id="movies">
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
