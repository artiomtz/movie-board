import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ContextPage from "../ContextPage";
import Info from "./Info";
import Cast from "./Cast";
import Image from "./Image";
import Video from "./Video";
import Review from "./Review";
import movieNotFound from "../assets/movieNotFound.jpg";
import IconApp from "../assets/iconApp.png";
import { motion } from "framer-motion";

export default function MovieDetails() {
  const { showType, showId } = useParams();
  const {
    movieDetails,
    getMovieDetails,
    cast,
    getCast,
    images,
    videos,
    reviews,
    getImages,
    getVideos,
    getReviews,
  } = useContext(ContextPage);

  const iconStyle = {
    objectFit: "contain",
    height: "100px",
    width: "100%",
  };

  const scrollableStyle = {
    height: "300px",
    overflow: "auto",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "22px",
  };

  const imageStyle = {
    width: "85%",
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

  const getOverview = () => {
    return movieDetails.overview ? movieDetails.overview : "Not Found";
  };

  useEffect(() => {
    getMovieDetails(showType, showId);
    getCast(showType, showId);
    getImages(showType, showId);
    getVideos(showType, showId);
    getReviews(showType, showId);
  }, []);

  return (
    <div className="container min-vh-100">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row p-3 align-items-center">
          <div className="pb-2">
            <a href="/">
              <img style={iconStyle} src={IconApp} alt="App icon didn't load" />
            </a>
          </div>
          <div
            className="p-3 ps-0 col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4 col-xxl-4"
            style={{
              textAlign:
                window.innerHeight < window.innerWidth ? "left" : "center",
            }}
          >
            <img
              className="p-3 border rounded shadow"
              style={imageStyle}
              src={getPoster(true)}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = movieNotFound;
              }}
              alt="Movie title didn't load"
            />
          </div>
          <div className="p-3 col-12 col-sm-12 col-md-12 col-lg-7 col-xl-8 col-xxl-8 shadow">
            <Info />
          </div>
        </div>
      </motion.div>

      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="pb-5"
      >
        <div className="container p-4 shadow">
          <div className="row p-3 pt-0" style={titleStyle}>
            Overview
          </div>
          {getOverview()}
        </div>
        <div className="container p-4 mt-4 shadow">
          <div className="row p-3 pt-0" style={titleStyle}>
            Cast
          </div>
          <div style={scrollableStyle}>
            {cast.filter((member) => !member.hasOwnProperty("department"))
              .length
              ? cast
                  .filter((member) => !member.hasOwnProperty("department"))
                  .map((person) => (
                    <Cast
                      key={person.id}
                      name={person.name}
                      character={person.character}
                      job={person.job}
                      photo={person.profile_path}
                    />
                  ))
              : "Not Found"}
          </div>
        </div>
        <div className="container p-4 mt-4 shadow">
          <div className="row p-3 pt-0" style={titleStyle}>
            Crew
          </div>
          <div style={scrollableStyle}>
            {cast.filter((member) => member.hasOwnProperty("department")).length
              ? cast
                  .filter((member) => member.hasOwnProperty("department"))
                  .map((person) => (
                    <Cast
                      key={person.id}
                      name={person.name}
                      character={person.character}
                      job={person.job}
                      photo={person.profile_path}
                    />
                  ))
              : "Not Found"}
          </div>
        </div>
        <div className="container p-4 mt-4 shadow">
          <div className="row p-3 pt-0" style={titleStyle}>
            Images
          </div>
          <div style={scrollableStyle}>
            {images.length
              ? images.map((image) => (
                  <Image key={image.file_path} path={image.file_path} />
                ))
              : "Not Found"}
          </div>
        </div>
        <div className="container p-4 mt-4 shadow">
          <div className="row p-3 pt-0" style={titleStyle}>
            Videos
          </div>
          <div style={scrollableStyle}>
            {videos.length
              ? videos
                  .filter((video) => video.site == "YouTube")
                  .map((video) => (
                    <Video key={video.id} name={video.name} path={video.key} />
                  ))
              : "Not Found"}
          </div>
        </div>
        <div className="container p-4 mt-4 shadow">
          <div className="row p-3 pt-0" style={titleStyle}>
            Reviews
          </div>
          <div style={scrollableStyle}>
            {reviews.length
              ? reviews.map((review) => (
                  <Review
                    key={review.id}
                    avatar={review.author_details.avatar_path}
                    user={review.author}
                    date={review.updated_at}
                    content={review.content}
                  />
                ))
              : "Not Found"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
