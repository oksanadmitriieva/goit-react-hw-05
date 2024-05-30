import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjZkYmFkODE1NjY1NDU4NTA4ZDFiMDA1Mzc5ZjA2MSIsInN1YiI6IjY2M2RmMTE3MDI5MzcyYTdlNDUxMWU5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.96Onhak4SOoJ4z0NSKSez4c_lqR5AorGsDr8YX8jbHw";

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
