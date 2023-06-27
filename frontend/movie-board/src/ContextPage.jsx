import React, { useState, createContext } from "react";
import { tmdbApiKey, watchModeApiKey } from "./keys.js";
import {
  movieProvidersExample,
  availableProvidersExample,
} from "./assets/apiResponseExample.js"; ////////// TMP

const ContextPage = createContext();

export function ContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [providers, setProviders] = useState([]);
  const [availableProviders, setAvailableProviders] = useState([]);
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
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US?&api_key=${tmdbApiKey}&page=${page}`
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
      console.log("Error while loading trending movies. Try again later.");
    }
  };

  const getSimilarMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovieId}/similar?language=en-US?&api_key=${tmdbApiKey}&page=${page}`
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
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US?&api_key=${tmdbApiKey}`
      );
      const data = await response.json();
      // console.log(data);
      setTv(() => {
        return data.results ? data.results : [];
      });
    } catch (error) {
      alert("Couldn't load Trending TV...");
      console.log("Error while loading trending tv data. Try again later.");
    }
  };

  const getAvailableProviders = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US?&api_key=${tmdbApiKey}` ///////////// TMP
        // `https://api.watchmode.com/v1/sources/?apiKey=${watchModeApiKey}` ///////////// REAL
      );
      const data = await response.json();
      // console.log(data);
      ///////////// REAL
      // setAvailableProviders(() => {
      //   return data ? data : [];
      // });
      ///////////// TMP
      setAvailableProviders(() => {
        return availableProvidersExample;
      });
    } catch (error) {
      console.log(
        "Error while loading available providers data. Try again later."
      );
    }
  };

  const getMovieProviders = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US?&api_key=${tmdbApiKey}` //////////// TMP
        // `https://api.watchmode.com/v1/title/movie-${movieId}/sources/?apiKey=${watchModeApiKey}` ////////// REAL
      );
      const data = await response.json();
      // console.log(data);
      ///////////// REAL
      // if (data) {
      //   setProviders(() => {
      //     setIsLoading(false);
      //     return filterProviders(data); ///////////// REAL
      //   });
      // }
      ///////////// TMP
      if (data) {
        setProviders(() => {
          setIsLoading(false);
          return filterProviders(movieProvidersExample); ///////////// REAL
        });
      }
    } catch (error) {
      console.log("Error while loading movie providers data. Try again later.");
    }
  };

  return (
    <ContextPage.Provider
      value={{
        page,
        setPage,
        movies,
        setMovies,
        tv,
        setTv,
        providers,
        getMovieProviders,
        getAvailableProviders,
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
        searchMovies,
        getTrendingMovies,
        getSimilarMovies,
        getTrendingTv,
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextPage;
