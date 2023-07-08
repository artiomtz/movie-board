import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ContextPage from "../ContextPage";
import Stream from "./Stream";
import movieNotFound from "../assets/movieNotFound.jpg";
import { Tooltip, Zoom, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function Movie(props) {
  const { setPage, languages, setResultsType, setSelectedMovieId } =
    useContext(ContextPage);

  const imageStyle = {
    objectFit: "cover",
    height: "400px",
    width: "100%",
    backgroundPosition: "center center",
  };

  const textStyle = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontWeight: "bold",
    fontSize: "17px",
  };

  const setSimilar = () => {
    setResultsType("similar");
    setSelectedMovieId(props.movieId);
    setPage(1);
  };

  return (
    <div className="col-9 col-sm-9 col-lg-4 p-3">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          <div className="p-3 pb-1 border rounded">
            <div className="row">
              <p style={textStyle}>{props.title}</p>
            </div>
            <div className="row pb-2">
              <Link to={"/movie/" + props.movieId}>
                <motion.p whileHover={{ scale: 1.05, opacity: 0.5 }}>
                  <Tooltip
                    placement="left-end"
                    arrow
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 250 }}
                    title={
                      <>
                        <Typography
                          sx={{
                            width: "200px",
                            fontWeight: "bold",
                          }}
                        >
                          {props.title}
                        </Typography>
                        <Typography>
                          Rating: {parseFloat(props.rating).toFixed(1)}
                        </Typography>
                        <Typography>
                          Language: {props.language.toUpperCase()}
                        </Typography>
                        <Typography>Release: {props.date}</Typography>
                      </>
                    }
                  >
                    <img
                      style={imageStyle}
                      src={
                        props.poster
                          ? "https://image.tmdb.org/t/p/w500" + props.poster
                          : movieNotFound
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = movieNotFound;
                      }}
                      alt="Movie title didn't load"
                    />
                  </Tooltip>
                </motion.p>
              </Link>
            </div>
            <div className="row">
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => {
                  setSimilar();
                }}
              >
                See similar
              </button>
            </div>
            <Stream key={props.movieId} movieId={props.movieId} />
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
