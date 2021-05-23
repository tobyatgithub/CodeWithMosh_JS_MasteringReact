const ListGroup = (props) => {
  const { allGenres, currentGenre, onGenreChange } = props;

  return (
    <ul className="list-group">
      {allGenres.map((genre) => (
        <li className="list-group-item" onClick={() => onGenreChange(genre)}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
