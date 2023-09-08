import React, { useEffect, useContext } from "react";
import ContextPage from "../ContextPage";
import IconApp from "../assets/iconApp.png";
import IconTmdb from "../assets/iconTmdb.svg";
import IconWatchMode from "../assets/iconWatchMode.png";
import IconMadeBy from "../assets/iconMadeBy.png";
import { motion } from "framer-motion";

export default function Title() {
  const { postTelemetry } = useContext(ContextPage);

  useEffect(() => {
    // postTelemetry();
  }, []);

  const bigIconStyle = {
    objectFit: "contain",
    height: "320px",
    width: "100%",
  };

  const iconStyle = {
    objectFit: "contain",
    height: "70px",
    width: "100%",
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
        <div>
          <a href="/">
            <img
              style={bigIconStyle}
              src={IconApp}
              alt="App icon didn't load"
            />
          </a>
        </div>
        <div className="row">
          <div className="p-2 col-4 col-xl-4">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="external"
            >
              <img
                style={iconStyle}
                src={IconTmdb}
                alt="App icon didn't load"
              />
            </a>
          </div>
          <div className="p-2 col-4 col-xl-4">
            <a href="https://www.watchmode.com/" target="_blank" rel="external">
              <img
                style={iconStyle}
                src={IconWatchMode}
                alt="App icon didn't load"
              />
            </a>
          </div>
          <div className="p-2 col-4 col-xl-4">
            <a href="http://artiomtsimk.in/" target="_blank" rel="external">
              <img
                style={iconStyle}
                src={IconMadeBy}
                alt="App icon didn't load"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
