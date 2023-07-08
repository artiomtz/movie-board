import React from "react";
import castNotFound from "../assets/castNotFound.jpg";

export default function Review(props) {
  const imageStyle = {
    borderRadius: "50%",
    width: "75px",
    height: "75px",
    objectFit: "cover",
  };

  const textStyle = {
    wordWrap: "break-word",
  };

  const getDate = (review) => {
    return review ? review.split("T")[0] : "Date Unknown";
  };

  return (
    <div className="container p-4 text-start shadow">
      <div className="row">
        <div className="col-3 ps-0 col-sm-3 col-md-2 col-lg-2 col-xl-1 col-xxl-1">
          <img
            style={imageStyle}
            src={
              props.avatar
                ? props.avatar.slice(1, 6) == "https"
                  ? props.avatar.slice(1)
                  : "https://image.tmdb.org/t/p/w500" + props.avatar
                : castNotFound
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = castNotFound;
            }}
            alt="No avatar found"
          />
        </div>
        <div className="col-9 col-sm-9 col-md-10 col-lg-10 col-xl-11 col-xxl-11">
          <div className="pb-3">
            <b>{props.user}</b>
            <div>{getDate(props.date)}</div>
          </div>
          <p style={textStyle}>{props.content}</p>
        </div>
      </div>
    </div>
  );
}
