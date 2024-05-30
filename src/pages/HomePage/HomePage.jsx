import { useEffect, useState } from 'react';
import { getTrendingFilms } from '../../search-films-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [filmList, setFilmlist] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function trendingFilmsList() {
      try {
        setLoading(true);
        const trendingFilms = await getTrendingFilms();
        setFilmlist(trendingFilms.data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    trendingFilmsList();
  }, []);
  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={filmList} />
      {loading && <Loader />}
      {error && 'Opps, something went wrong. Please, reload the page...'}
    </div>
  );
}
