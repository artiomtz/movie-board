import React from "react";
import { Link } from "react-router-dom";
import tvNotFound from "../assets/tvNotFound.jpg";

export default function NotFound() {
  const rowStyle = {
    height: "200px",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "20px",
  };

  const imageStyle = {
    objectFit: "cover",
    height: "500px",
    width: "100%",
    backgroundPosition: "center center",
  };

  return (
    <div className="text-bg-dark">
      <div className="container text-center min-vh-100">
        <div className="row align-items-center" style={rowStyle}>
          <div className="p-3">
            <p style={titleStyle}>Nothing Here :(</p>
            <p>
              Click <Link to={"/"}>here</Link> to go back to Trending
            </p>
          </div>
        </div>
        <div className="row p-3 m-3 align-items-center border rounded">
          <img src={tvNotFound} style={imageStyle} />
        </div>
      </div>
    </div>
  );
}
