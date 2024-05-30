import { getMovieReview } from '../../search-films-api';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import css from './MoviewReviews.module.css';

export default function MovieReviews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    async function getReviews() {
      try {
        setLoading(true);
        const movieReviews = await getMovieReview(movieId);
        setReviews(movieReviews.data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <div>
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li className={css.reviewItem} key={review.id}>
              <b>Author: {review.author}</b>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews !== null && reviews.length === 0 && (
        <p>Sorry, there are no reviews for this movie yet</p>
      )}
      {loading && <Loader />}
      {error && <p>Please restart the page</p>}
    </div>
  );
}
