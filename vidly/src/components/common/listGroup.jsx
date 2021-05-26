const ListGroup = (props) => {
  const {
    allGenres,
    textProperty,
    valueProperty,
    currentGenre,
    onGenreChange,
  } = props;

  return (
    <ul className="list-group">
      {allGenres.map((genre) => (
        <li
          key={genre[valueProperty]}
          className={
            genre === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreChange(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
