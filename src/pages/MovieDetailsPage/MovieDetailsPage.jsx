import { getFilmDetails } from '../../search-films-api';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function getDetails() {
      try {
        setLoading(true);
        const details = await getFilmDetails(movieId);
        setMovieDetails(details.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getDetails();
  }, [movieId]);

  return (
    <div className={css.details}>
      <NavLink className={getNavLinkClass} to={backLinkRef.current}>
        Go back
      </NavLink>
      {movieDetails && (
        <div className={css.detailsContainer}>
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
            alt="movie poster"
          />
          <h2>
            {movieDetails.title} (
            {movieDetails.release_date.slice(
              0,
              movieDetails.release_date.indexOf('-')
            )}
            )
          </h2>
          <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>

          <b>Owerview</b>
          <p>{movieDetails.overview}</p>
          <b>Genres</b>
          <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      )}
      <h3> Aditional information</h3>
      <ul className={css.aditionalList}>
        <li>
          <NavLink className={getNavLinkClass} to="cast">
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink className={getNavLinkClass} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      {loading && <Loader />}
      {error && <p>Please restart the page</p>}
    </div>
  );
}
