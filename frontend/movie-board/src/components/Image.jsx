import React from "react";
import tvNotFound from "../assets/tvNotFound.jpg";
import { Tooltip, Zoom } from "@mui/material";

export default function Image(props) {
  const cardStyle = {
    width: "150px",
    display: "inline-block",
  };

  const imageStyle = {
    width: "100%",
    objectFit: "cover",
  };

  const tooltipStyle = {
    width: "500px",
    minWidth: "200px",
    border: "5px solid dimgray",
    borderRadius: "5px",
    objectFit: "cover",
  };

  return (
    <div className="container p-4 text-center" style={cardStyle}>
      <div className="row">
        <div>
          <Tooltip
            placement="bottom"
            arrow
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 250 }}
            title={
              <img
                style={tooltipStyle}
                src={
                  props.path
                    ? "https://image.tmdb.org/t/p/w500" + props.path
                    : movieNotFound
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = movieNotFound;
                }}
                alt="No image found"
              />
            }
          >
            <img
              style={imageStyle}
              src={
                props.path
                  ? "https://image.tmdb.org/t/p/w500" + props.path
                  : tvNotFound
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = tvNotFound;
              }}
              alt="No image found"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
