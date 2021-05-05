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
    const new_movies = this.state.movies.filter(
      (exist_movie) => exist_movie != movie
    );
    this.setState({ movies: new_movies });
  };

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
            className="btn btn-secondary btn-sm"
          >
            Delete
          </button>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Movie Database</h1>
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
      </div>
    );
  }
}

export default Movies;
