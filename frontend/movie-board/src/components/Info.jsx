import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ContextPage from "../ContextPage";
import movieNotFound from "../assets/movieNotFound.jpg";
import { Tooltip, Zoom } from "@mui/material";

export default function Info() {
  const { showType } = useParams();
  const { movieDetails, languages, getLanguages } = useContext(ContextPage);

  const bigTitleStyle = {
    fontWeight: "bold",
    fontSize: "30px",
  };

  const tooltipStyle = {
    width: "100%",
  };

  const getTitle = () => {
    if (showType == "movie") {
      return movieDetails.title ? movieDetails.title : "Unknown";
    } else {
      return movieDetails.name ? movieDetails.name : "Unknown";
    }
  };

  const getPoster = (mainPoster) => {
    if (mainPoster && movieDetails.poster_path) {
      return "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path;
    } else if (!mainPoster) {
      return (
        "https://image.tmdb.org/t/p/w500" +
        movieDetails.belongs_to_collection.poster_path
      );
    } else {
      return movieNotFound;
    }
  };

  const getTagline = () => {
    return movieDetails.tagline ? '"' + movieDetails.tagline + '"' : null;
  };

  const getRelease = () => {
    let release = "";
    if (showType == "movie") {
      release = movieDetails.release_date
        ? movieDetails.release_date
        : "Unknown";
    } else {
      if (movieDetails.first_air_date) {
        release = movieDetails.first_air_date;
        if (movieDetails.status) {
          release += " (" + movieDetails.status + ")";
        }
      } else {
        release = "Unknown";
      }
    }
    return release;
  };

  const getRuntime = () => {
    let runtime = "";
    if (showType == "movie") {
      runtime = movieDetails.runtime
        ? movieDetails.runtime + " Minutes"
        : "Unknown";
    } else {
      if (movieDetails.number_of_seasons) {
        runtime = movieDetails.number_of_seasons + " Seasons";
        if (movieDetails.number_of_episodes) {
          runtime += " (" + movieDetails.number_of_episodes + " Episodes)";
        }
      } else {
        runtime = "Unknown";
      }
    }
    return runtime;
  };

  const getRanking = () => {
    let ranking = "";
    if (movieDetails.vote_average) {
      ranking = movieDetails.vote_average.toFixed(1);
      if (movieDetails.vote_count) {
        ranking += " (" + movieDetails.vote_count + " votes)";
      }
    } else {
      ranking = "Unknown";
    }
    return ranking;
  };

  const getLanguage = (languageKey) => {
    if (languages.length) {
      let language = languages.filter(
        (language) => language.iso_639_1 == languageKey
      );
      if (language.length) {
        return language[0].english_name;
      } else {
        return "Unknown";
      }
    } else {
      return "Unknown";
    }
  };

  const getPrice = (amount) => {
    return amount
      ? "$" +
          amount
            .toLocaleString("us-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })
            .split("$")[1] +
          " USD"
      : "Unknown";
  };

  const getCollection = () => {
    return movieDetails.belongs_to_collection
      ? movieDetails.belongs_to_collection.name
      : "Unknown";
  };

  const getHomePage = () => {
    return movieDetails.homepage ? movieDetails.homepage.split("/")[2] : "None";
  };

  const getGenres = () => {
    if (!movieDetails.genres || !movieDetails.genres.length) {
      return "Unknown";
    } else {
      let genres = "";
      movieDetails.genres.forEach((genre) => (genres += genre.name + ", "));
      return genres.slice(0, -2);
    }
  };

  const getCompanies = () => {
    if (
      !movieDetails.production_companies ||
      !movieDetails.production_companies.length
    ) {
      return "Unknown";
    } else {
      let companies = "";
      movieDetails.production_companies.forEach(
        (company) => (companies += company.name + ", ")
      );
      return companies.slice(0, -2);
    }
  };

  const getCountries = () => {
    if (
      !movieDetails.production_countries ||
      !movieDetails.production_countries.length
    ) {
      return "Unknown";
    } else {
      let countries = "";
      movieDetails.production_countries.forEach(
        (country) => (countries += country.name + ", ")
      );
      return countries.slice(0, -2);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <div>
      <div className="row p-3">
        <span style={bigTitleStyle}>{getTitle()}</span>
        <span>
          <b>{getTagline()}</b>
        </span>
      </div>
      <div className="row p-3">
        <span>
          <b>Release: </b>
          {getRelease()}
        </span>
        <span>
          <b>Runtime: </b>
          {getRuntime()}
        </span>
        <span>
          <b>Rating: </b>
          {getRanking()}
        </span>
      </div>
      <div className="row p-3">
        <span>
          <b>Language: </b>
          {getLanguage(movieDetails.original_language)}
        </span>
        <span>
          <b>Budget: </b>
          {getPrice(movieDetails.budget)}
        </span>
        <span>
          <b>Revenue: </b>
          {getPrice(movieDetails.revenue)}
        </span>
        <span>
          <b>Collection: </b>
          {movieDetails.belongs_to_collection ? (
            <Tooltip
              placement="bottom-end"
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 250 }}
              title={
                <img
                  className="p-2"
                  style={tooltipStyle}
                  src={getPoster(false)}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = movieNotFound;
                  }}
                  alt="No collection found"
                />
              }
            >
              <span>
                <ins>{getCollection()}</ins>
              </span>
            </Tooltip>
          ) : (
            "None"
          )}
        </span>
        <span>
          <b>Home Page: </b>
          {movieDetails.homepage ? (
            <a href={movieDetails.homepage} target="_blank" rel="external">
              {getHomePage()}
            </a>
          ) : (
            "None"
          )}
        </span>
      </div>
      <div className="row p-3">
        <span>
          <b>Genres: </b>
          {getGenres()}
        </span>
        <span>
          <b>Production: </b>
          {getCompanies()}
        </span>
        <span>
          <b>Country: </b>
          {getCountries(0)}
        </span>
      </div>
    </div>
  );
}
