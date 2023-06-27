import React, { useContext, useEffect } from "react";
import ContextPage from "../ContextPage";
import Carousel from "react-bootstrap/Carousel";
import tvNotFound from "../assets/tvNotFound.jpg";
import { Tooltip, Zoom, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function UncontrolledExample() {
  const { tv, getTrendingTv } = useContext(ContextPage);

  const imageStyle = {
    objectFit: "cover",
    height: "400px",
    width: "100%",
  };

  useEffect(() => {
    getTrendingTv();
  }, []);

  return (
    <div
      className="container p-3 col-lg-8 col-xl-8 col-xxl-5"
      style={{ visibility: tv.length ? "visible" : "hidden" }}
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row justify-content-center">
          <Carousel>
            {tv.map((show) => (
              <Carousel.Item key={show.id}>
                <a href="">
                  <Tooltip
                    placement="bottom-end"
                    arrow
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 250 }}
                    title={
                      <>
                        <Typography
                          color="inherit"
                          sx={{
                            width: "200px",
                            fontWeight: "bold",
                          }}
                        >
                          {show.name}
                        </Typography>
                        <Typography>
                          Rating: {parseFloat(show.vote_average).toFixed(1)}
                        </Typography>
                        <Typography>
                          Language: {show.original_language.toUpperCase()}
                        </Typography>
                        <Typography>Release: {show.first_air_date}</Typography>
                      </>
                    }
                  >
                    <img
                      style={imageStyle}
                      className="img-fluid"
                      src={
                        "https://image.tmdb.org/t/p/w500" + show.backdrop_path
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = tvNotFound;
                      }}
                      alt="Movie title didn't load"
                    />
                  </Tooltip>
                </a>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </motion.div>
    </div>
  );
}
