import React from "react";

export default function Video(props) {
  const cardStyle = {
    width: "300px",
    display: "inline-block",
  };

  return (
    <div className="container p-3 text-center" style={cardStyle}>
      <div className="row">
        <iframe
          height="160"
          allowFullScreen
          title={props.name}
          src={"https://www.youtube.com/embed/" + props.path}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
