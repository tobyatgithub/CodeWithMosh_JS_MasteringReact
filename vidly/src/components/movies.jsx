import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";

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

  render() {
    const { length: numOfMovies } = this.state.movies;
    const { pageSize, currentPage } = this.state;
    if (numOfMovies === 0) return <p>There are no movies in the database.</p>;
    const movies = paginate(this.state.movies, currentPage, pageSize);

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
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
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
            ))}
          </tbody>
        </table>

        <Pagination
          itemsCount={numOfMovies}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
