export const getTrendingMoviesApi = async (page) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${TMDB_TOKEN}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert("hmm.. something's not right");
    console.error("Error while loading trending movies. Try again later.");
  }
};

export const getSimilarMoviesApi = async (page, movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&api_key=${TMDB_TOKEN}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while loading similar movies data. Try again later.");
  }
};

export const searchMoviesApi = async (page, query) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&region=us&include_adult=false&api_key=${TMDB_TOKEN}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert("hmm.. something's not right");
    console.error("Error while loading search data. Try again later.");
  }
};

export const getTrendingTvApi = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${TMDB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Couldn't load Trending TV...");
    console.error("Error while loading trending TV data. Try again later.");
  }
};

export const getLanguagesApi = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${TMDB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while loading Languages data. Try again later.");
  }
};

export const getMovieDetailsApi = async (showType, movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${showType}/${movieId}?language=en-US&api_key=${TMDB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while loading Movie details. Try again later.");
  }
};

export const getCastApi = async (showType, movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${showType}/${movieId}/credits?language=en-US&api_key=${TMDB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while loading Cast. Try again later.");
  }
};

export const getImagesApi = async (showType, movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${showType}/${movieId}/images?api_key=${TMDB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while loading Images. Try again later.");
  }
};

export const getVideosApi = async (showType, movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${showType}/${movieId}/videos?api_key=${TMDB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while loading Videos. Try again later.");
  }
};

export const getReviewsApi = async (showType, movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${showType}/${movieId}/reviews?language=en-US&page=1&api_key=${TMDB_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while loading Videos. Try again later.");
  }
};
