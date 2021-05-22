import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  constructor() {
    super();
    this.handleDeleter = this.handleDeleter.bind(this);
  }

  handleDeleter = (movie) => {
    // const new_movies = this.state.movies.filter(
    //   (exist_movie) => exist_movie != movie
    // );
    const new_movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: new_movies });
  };

  handleLike = (movie) => {
    console.log("like clicked", movie);
    const movies_copy = [...this.state.movies];
    const index = movies_copy.indexOf(movie);
    movies_copy[index] = { ...movies_copy[index] };
    movies_copy[index].liked = !movies_copy[index].liked;
    this.setState({ movies: movies_copy });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
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
        liked,
      } = movie;

      return (
        <tr key={_id}>
          <td>{title}</td>
          <td>{genre.name}</td>
          <td>{numberInStock}</td>
          <td>{dailyRentalRate}</td>
          <td>
            <Like liked={liked} onClick={() => this.handleLike(movie)} />
          </td>
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
    const { pageSize, currentPage } = this.state;
    if (numOfMovies === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
        <p>Showing {numOfMovies} movies in the database.</p>
        <table className="table">
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
            <th>Action</th>
          </tr>

          <tbody>{this.renderTableData()}</tbody>
        </table>

        <Pagination
          itemsCount={this.state.movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
