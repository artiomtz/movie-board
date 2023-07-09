import React, { useState, createContext } from "react";
import { tmdbApiKey, watchModeApiKey } from "./keys.js";
import {
  movieProvidersExample,
  availableProvidersExample,
} from "./assets/apiResponseExample.js";

const ContextPage = createContext();

export function ContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [tv, setTv] = useState([]);
  const [cast, setCast] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [providers, setProviders] = useState([]);
  const [availableProviders, setAvailableProviders] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const [resultsType, setResultsType] = useState("trending");
  const [totalPages, setTotalPages] = useState(10);
  const [pageAmount, setPageAmount] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  const filterMovies = (previous, results) => {
    if (page == 1) {
      return results;
    } else {
      let addMovies = [];
      results.forEach((newMovie) => {
        for (let i = 0; i < movies.length; i++) {
          if (movies[i].id == newMovie.id) {
            return;
          }
        }
        addMovies.push(newMovie);
      });
      return [...previous, ...addMovies];
    }
  };

  const filterProviders = (providers) => {
    let filteredProviders = [];
    providers.forEach((movieProvider) => {
      for (let i = 0; i < filteredProviders.length; i++) {
        if (filteredProviders[i].source_id == movieProvider.source_id) {
          return;
        }
      }
      let provider = availableProviders.filter(
        (availableProvider) => availableProvider.id == movieProvider.source_id
      );
      if (provider.length) {
        movieProvider.format = provider[0].logo_100px;
      } else {
        movieProvider.format = null;
      }
      filteredProviders.push(movieProvider);
    });
    return filteredProviders;
  };

  const filterCast = (results) => {
    let addCast = [];
    results.forEach((person) => {
      for (let i = 0; i < addCast.length; i++) {
        if (addCast[i].id == person.id) {
          return;
        }
      }
      addCast.push(person);
    });
    return addCast;
  };

  const updateMovies = () => {
    if (page == 1) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    if (resultsType == "trending") {
      getTrendingMovies();
    } else if (resultsType == "similar") {
      getSimilarMovies();
    } else if (resultsType == "search") {
      searchMovies();
    }
  };

  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${tmdbApiKey}&page=${page}`
      );
      const data = await response.json();
      // console.log(data);
      if (data.results) {
        setMovies((previous) => {
          return filterMovies(previous, data.results);
        });
      }
      setTotalPages(data.total_pages);
    } catch (error) {
      alert("hmm.. something's not right");
      console.log("Error while loading trending movies. Try again later.");
    }
  };

  const getSimilarMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovieId}/similar?language=en-US&api_key=${tmdbApiKey}&page=${page}`
      );
      const data = await response.json();
      // console.log(data);
      if (data.results) {
        setMovies((previous) => {
          return filterMovies(previous, data.results);
        });
      }
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log("Error while loading similar movies data. Try again later.");
    }
  };

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&region=us&include_adult=false&api_key=${tmdbApiKey}&page=${page}`
      );
      const data = await response.json();
      // console.log(data);
      if (data.results) {
        setMovies((previous) => {
          return filterMovies(previous, data.results);
        });
      }
      setTotalPages(data.total_pages);
    } catch (error) {
      alert("hmm.. something's not right");
      console.log("Error while loading search data. Try again later.");
    }
  };

  const getTrendingTv = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${tmdbApiKey}`
      );
      const data = await response.json();
      // console.log(data);
      setTv(() => {
        return data.results ? data.results : [];
      });
    } catch (error) {
      alert("Couldn't load Trending TV...");
      console.log("Error while loading trending TV data. Try again later.");
    }
  };

  const getAvailableProviders = async () => {
    try {
      if (process.env.NODE_ENV == "production") {
        const response = await fetch(
          `https://api.watchmode.com/v1/sources/?apiKey=${watchModeApiKey}`
        );
        const data = await response.json();
        // console.log(data);
        setAvailableProviders(() => {
          return data ? data : [];
        });
      } else {
        console.log("Getting available providers in Dev mode");
        setAvailableProviders(() => {
          return availableProvidersExample;
        });
      }
    } catch (error) {
      console.log(
        "Error while loading available providers data. Try again later."
      );
    }
  };

  const getMovieProviders = async (movieId) => {
    try {
      if (process.env.NODE_ENV == "production") {
        const response = await fetch(
          `https://api.watchmode.com/v1/title/movie-${movieId}/sources/?apiKey=${watchModeApiKey}`
        );
        const data = await response.json();
        // console.log(data);
        if (data) {
          setProviders(() => {
            setIsLoading(false);
            return filterProviders(data);
          });
        }
      } else {
        console.log("Getting movie providers in Dev mode");
        setProviders(() => {
          setIsLoading(false);
          return filterProviders(movieProvidersExample);
        });
      }
    } catch (error) {
      console.log("Error while loading movie providers data. Try again later.");
    }
  };

  const getLanguages = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/configuration/languages?api_key=${tmdbApiKey}`
      );
      const data = await response.json();
      // console.log(data);
      setLanguages(() => {
        return data ? data : [];
      });
    } catch (error) {
      console.log("Error while loading Languages data. Try again later.");
    }
  };

  const getMovieDetails = async (showType, movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${showType}/${movieId}?language=en-US&api_key=${tmdbApiKey}`
      );
      const data = await response.json();
      // console.log(data);
      setMovieDetails(() => {
        return data ? data : null;
      });
    } catch (error) {
      console.log("Error while loading Movie details. Try again later.");
    }
  };

  const getCast = async (showType, movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${showType}/${movieId}/credits?language=en-US&api_key=${tmdbApiKey}`
      );
      const data = await response.json();
      // console.log(data);
      if (data) {
        setCast(() => {
          return filterCast(data.cast).concat(filterCast(data.crew));
        });
      }
    } catch (error) {
      console.log("Error while loading Cast. Try again later.");
    }
  };

  const getImages = async (showType, movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${showType}/${movieId}/images?api_key=${tmdbApiKey}`
      );
      const data = await response.json();
      // console.log(data);
      if (data) {
        setImages(() => {
          return data.backdrops ? data.backdrops : [];
        });
      }
    } catch (error) {
      console.log("Error while loading Images. Try again later.");
    }
  };

  const getVideos = async (showType, movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${showType}/${movieId}/videos?api_key=${tmdbApiKey}`
      );
      const data = await response.json();
      // console.log(data);
      if (data) {
        setVideos(() => {
          return data.results ? data.results : [];
        });
      }
    } catch (error) {
      console.log("Error while loading Videos. Try again later.");
    }
  };

  const getReviews = async (showType, movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${showType}/${movieId}/reviews?language=en-US&page=1&api_key=${tmdbApiKey}`
      );
      const data = await response.json();
      // console.log(data);
      if (data) {
        setReviews(() => {
          return data.results ? data.results : [];
        });
      }
    } catch (error) {
      console.log("Error while loading Videos. Try again later.");
    }
  };

  return (
    <ContextPage.Provider
      value={{
        page,
        setPage,
        movies,
        movieDetails,
        setMovies,
        tv,
        setTv,
        cast,
        images,
        videos,
        reviews,
        providers,
        languages,
        search,
        setSearch,
        selectedMovieId,
        setSelectedMovieId,
        resultsType,
        setResultsType,
        totalPages,
        pageAmount,
        isLoading,
        setIsLoading,
        updateMovies,
        getMovieDetails,
        getCast,
        getImages,
        getVideos,
        getReviews,
        getMovieProviders,
        getAvailableProviders,
        getLanguages,
        searchMovies,
        getTrendingTv,
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextPage;
