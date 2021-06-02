import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    allGenres: [], // we init a place holder here and init it in did mount.
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), allGenres: genres });
  }

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
    // console.log("like clicked", movie);
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
    // console.log("new genre clicked", genre);
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      currentGenre,
      movies: allMovies,
    } = this.state;

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((m) => m.genre._id === currentGenre._id)
        : allMovies;

    // Sort
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: numOfMovies } = this.state.movies;
    const { pageSize, currentPage, sortColumn, allGenres, currentGenre } =
      this.state;
    if (numOfMovies === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            allGenres={allGenres}
            currentGenre={currentGenre}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDeleter}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
