export const getAvailableProvidersApi = async () => {
  try {
    const response = await fetch(
      `https://api.watchmode.com/v1/sources/?apiKey=${WATCHMODE_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(
      "Error while loading available providers data. Try again later."
    );
  }
};

export const getMovieProvidersApi = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.watchmode.com/v1/title/movie-${movieId}/sources/?apiKey=${WATCHMODE_TOKEN}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while loading movie providers data. Try again later.");
  }
};
