import React, { useState, createContext } from "react";
import {
  getTrendingMoviesApi,
  getSimilarMoviesApi,
  searchMoviesApi,
  getTrendingTvApi,
  getLanguagesApi,
  getMovieDetailsApi,
  getCastApi,
  getImagesApi,
  getVideosApi,
  getReviewsApi,
} from "./api/Movies";
import {
  getAvailableProvidersApi,
  getMovieProvidersApi,
} from "./api/Streaming";
import {
  filterMovies,
  filterProviders,
  filterCast,
} from "./utils/FilterDuplicates";
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
  const [isLoading, setIsLoading] = useState(true);

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
    const data = await getTrendingMoviesApi(page);
    if (data.results) {
      setMovies((current) => {
        return filterMovies(page, current, data.results);
      });
      setTotalPages(data.total_pages);
    }
  };

  const getSimilarMovies = async () => {
    const data = await getSimilarMoviesApi(page, selectedMovieId);
    if (data.results) {
      setMovies((current) => {
        return filterMovies(page, current, data.results);
      });
      setTotalPages(data.total_pages);
    }
  };

  const searchMovies = async () => {
    const data = await searchMoviesApi(page, search);
    if (data.results) {
      setMovies((current) => {
        return filterMovies(page, current, data.results);
      });
      setTotalPages(data.total_pages);
    }
  };

  const getTrendingTv = async () => {
    const data = await getTrendingTvApi();
    setTv(() => {
      return data.results ? data.results : [];
    });
  };

  const getAvailableProviders = async () => {
    if (process.env.NODE_ENV == "production") {
      const data = await getAvailableProvidersApi();
      setAvailableProviders(() => {
        return data ? data : [];
      });
    } else {
      console.log("Getting available providers in Dev mode");
      setAvailableProviders(() => {
        return availableProvidersExample;
      });
    }
  };

  const getMovieProviders = async (movieId) => {
    if (process.env.NODE_ENV == "production") {
      const data = await getMovieProvidersApi(movieId);
      if (data && Array.isArray(data)) {
        setProviders(() => {
          return filterProviders(availableProviders, data);
        });
      } else {
        setProviders([]);
      }
    } else {
      console.log("Getting movie providers in Dev mode");
      setProviders(() => {
        return filterProviders(availableProviders, movieProvidersExample);
      });
    }
    setIsLoading(false);
  };

  const getLanguages = async () => {
    const data = await getLanguagesApi();
    setLanguages(() => {
      return data ? data : [];
    });
  };

  const getMovieDetails = async (showType, movieId) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const data = await getMovieDetailsApi(showType, movieId);
    setMovieDetails(() => {
      return data ? data : null;
    });
  };

  const getCast = async (showType, movieId) => {
    const data = await getCastApi(showType, movieId);
    if (data) {
      setCast(() => {
        return filterCast(data.cast).concat(filterCast(data.crew));
      });
    }
  };

  const getImages = async (showType, movieId) => {
    const data = await getImagesApi(showType, movieId);
    if (data) {
      setImages(() => {
        return data.backdrops ? data.backdrops : [];
      });
    }
  };

  const getVideos = async (showType, movieId) => {
    const data = await getVideosApi(showType, movieId);
    if (data) {
      setVideos(() => {
        return data.results ? data.results : [];
      });
    }
  };

  const getReviews = async (showType, movieId) => {
    const data = await getReviewsApi(showType, movieId);
    if (data) {
      setReviews(() => {
        return data.results ? data.results : [];
      });
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
