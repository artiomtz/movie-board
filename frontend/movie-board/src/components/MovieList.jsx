import React, { useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import Movie from "./Movie";

export default function MovieList() {
  const {
    page,
    setPage,
    movies,
    getAvailableProviders,
    search,
    selectedMovieId,
    resultsType,
    setResultsType,
    pageAmount,
    updateMovies,
  } = useContext(ContextPage);

  useEffect(() => {
    getAvailableProviders();
  }, []);

  useEffect(() => {
    updateMovies();
  }, [page, search, selectedMovieId, resultsType]);

  const loadMore = () => {
    if (movies.length == 0 || movies.length % pageAmount != 0) {
      setResultsType("trending");
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  const loadMoreText = () => {
    if (movies.length == 0) {
      return "Whoops... Try loading more";
    } else if (movies.length % pageAmount != 0) {
      return "That's it. Click to go back to Trending";
    } else {
      return "Load More";
    }
  };

  return (
    <div className="container text-center pb-4 min-vh-100">
      <div className="row justify-content-center row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            movieId={movie.id}
            title={movie.title}
            date={movie.release_date}
            language={movie.original_language}
            rating={movie.vote_average}
            poster={movie.poster_path}
          />
        ))}
      </div>
      <div className="p-4">
        <button
          type="submit"
          className="btn btn-primary ps-4 pe-4"
          onClick={() => {
            loadMore();
          }}
        >
          {loadMoreText()}
        </button>
      </div>
    </div>
  );
}
