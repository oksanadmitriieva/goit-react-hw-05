import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzFlYzU5ZDkzYTM3MmJjN2M2YTI5ZGM3NDAwZDAyMCIsInN1YiI6IjY2NTg0YjQ1NDkwZjIyMzUyNTFkMTVmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CnptxMvvVqdUESpFnZF0DAjb8QeAq-_DbYwks6aekJI";

const options = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
// trending
export async function getTrendingFilms() {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  return await axios.get(url, options);
}

// query
export async function getRequestedFilm(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  return await axios.get(url, options);
}

// id-details
export async function getFilmDetails(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  return await axios.get(url, options);
}

// cast
export async function getMovieCast(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  return await axios.get(url, options);
}

// reviews
export async function getMovieReview(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  return await axios.get(url, options);
}
