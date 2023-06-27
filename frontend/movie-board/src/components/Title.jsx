import React from "react";
import IconApp from "../assets/iconApp.png";
import IconTmdb from "../assets/iconTmdb.svg";
import IconWatchMode from "../assets/iconWatchMode.png";
import IconMadeBy from "../assets/IconMadeBy.jpg";
import { motion } from "framer-motion";

export default function Title() {
  const iconStyle = {
    objectFit: "contain",
    height: "40px",
    width: "100%",
  };

  const titleStyle = {
    objectFit: "contain",
    height: "350px",
    width: "100%",
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="container p-3 col-sm-10 col-md-10 col-lg-4 col-xl-4 col-xxl-3"
      >
        <div className="row justify-content-center">
          <div className="">
            <a href="">
              <img
                style={titleStyle}
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
              <a
                href="https://www.watchmode.com/"
                target="_blank"
                rel="external"
              >
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
    </>
  );
}
