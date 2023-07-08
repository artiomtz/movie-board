import React from "react";
import castNotFound from "../assets/castNotFound.jpg";

export default function Cast(props) {
  const cardStyle = {
    width: "150px",
    display: "inline-block",
  };

  const imageStyle = {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    objectFit: "cover",
  };

  return (
    <div className="container p-4 text-center" style={cardStyle}>
      <div className="row">
        <div>
          <img
            style={imageStyle}
            src={
              props.photo
                ? "https://image.tmdb.org/t/p/w500" + props.photo
                : castNotFound
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = castNotFound;
            }}
            alt="No image found"
          />
        </div>
        <div className="p-2">
          <div>
            <b>{props.name}</b>
          </div>
          <div>{props.character ? props.character : props.job}</div>
        </div>
      </div>
    </div>
  );
}
