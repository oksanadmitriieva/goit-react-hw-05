import { useEffect, useState } from "react";
import { getMovieCast } from "../../search-films-api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        const movieCast = await getMovieCast(movieId);
        setCast(movieCast.data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);
  return (
    <div>
      {cast && (
        <ul className={css.castList}>
          {cast.map((actor) => (
            <li className={css.castItem} key={actor.cast_id}>
              <p className={css.name}>{actor.name}</p>
              <p className={css.role}>{actor.character}</p>
              <img
                className={css.actorImg}
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt="actor photo"
              />
            </li>
          ))}
        </ul>
      )}
      {loading && <Loader />}
      {error && <p>Please restart the page</p>}
    </div>
  );
}
