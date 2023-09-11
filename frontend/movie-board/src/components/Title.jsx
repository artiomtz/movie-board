import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ContextPage from "../ContextPage";
import IconApp from "../assets/iconApp.png";
import IconTmdb from "../assets/iconTmdb.svg";
import IconWatchMode from "../assets/iconWatchMode.png";
import IconMadeBy from "../assets/iconMadeBy.png";
import { motion } from "framer-motion";

export default function Title() {
  const { postTelemetry } = useContext(ContextPage);

  useEffect(() => {
    postTelemetry();
  }, []);

  const bigIconStyle = {
    objectFit: "contain",
    height: "320px",
    width: "100%",
  };

  const iconStyle = {
    objectFit: "contain",
    height: "50px",
    width: "100%",
  };

  const telemetryStyle = {
    fontSize: "10px",
    opacity: 0.5,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container p-3 col-12 col-sm-10 col-md-10 col-lg-4 col-xl-4 col-xxl-3"
    >
      <div className="row justify-content-center">
        <div className="m-0 p-0">
          <div className="row justify-content-evenly">
            <div className="col-3 p-0 text-center">
              <Link to={"/telemetry/"}>
                <button
                  type="button"
                  className="btn btn-secondary p-0 ps-4 pe-4"
                  style={telemetryStyle}
                >
                  Telemetry
                </button>
              </Link>
            </div>
            <div className="col-3 p-0 text-center">
              <a
                href="https://github.com/artiomtz/movie-board"
                target="_blank"
                rel="external"
              >
                <button
                  type="button"
                  className="btn btn-secondary p-0 ps-4 pe-4"
                  style={telemetryStyle}
                >
                  Github
                </button>
              </a>
            </div>
          </div>
        </div>
        <div>
          <a href="/">
            <img style={bigIconStyle} src={IconApp} alt="App icon - Home" />
          </a>
        </div>
        <div className="row">
          <div className="p-2 col-4 col-xl-4">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="external"
            >
              <img style={iconStyle} src={IconTmdb} alt="TMDB" />
            </a>
          </div>
          <div className="p-2 col-4 col-xl-4">
            <a href="https://www.watchmode.com/" target="_blank" rel="external">
              <img style={iconStyle} src={IconWatchMode} alt="WatchMode" />
            </a>
          </div>
          <div className="p-2 col-4 col-xl-4">
            <a href="http://artiomtsimk.in/" target="_blank" rel="external">
              <img style={iconStyle} src={IconMadeBy} alt="My Website" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
