import React, { Component } from "react";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    allGenres: getGenres().concat({ id: "0", name: "All Genres" }),
    currentGenre: { id: "0", name: "All Genres" },
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

  handleGenreChange = (genre) => {
    console.log("new genre clicked", genre);
    this.setState({ currentGenre: genre });
  };

  renderTags() {
    let numOfMovies = this.state.movies.length;
    if (numOfMovies === 0) return <p>There are no movies in the database.</p>;
    return <p>Showing {numOfMovies} movies in the database.</p>;
  }

  render() {
    const { length: numOfMovies } = this.state.movies;
    const { pageSize, currentPage, allGenres, currentGenre } = this.state;
    if (numOfMovies === 0) return <p>There are no movies in the database.</p>;

    console.log("currentGenre", currentGenre);

    let movies = this.state.movies;
    if (currentGenre.name !== "All Genres") {
      movies = movies.filter((movie) => movie.genre.name === currentGenre.name);
    }
    movies = paginate(movies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            allGenres={allGenres}
            currentGenre={currentGenre}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
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
        </div>
      </div>
    );
  }
}

export default Movies;
