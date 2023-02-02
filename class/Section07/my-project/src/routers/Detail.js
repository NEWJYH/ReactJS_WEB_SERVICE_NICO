import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();

  const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`;

  const getMovie = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading ... </h1>
      ) : (
        <div>
          <h1>
            {movie.title} - rating : {movie.rating} - like : {movie.like_count}
          </h1>
          <ul>
            {movie.genres.map((item, index) => {
              return <li key={`${index}`}>{item}</li>;
            })}
          </ul>
          <img src={`${movie.medium_cover_image}`} alt={`${movie.title} img`} />
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
