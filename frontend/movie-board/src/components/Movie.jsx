import Stream from "./Stream";

export default function Movie() {
  const ImageStyle = {
    // width: "200px",
    // "object-position": center,
    // resizeMode: "contain",
    height: "400px",
    // "justify-content": center,
    "background-position": "center center",
    // "background-repeat": "no-repeat",
    // overflow: "hidden",
    // height: "100%",
    // "min-height": "100%",
    width: "100%",
    // "border-radius": "5px",
    "object-fit": "cover",
    // "&:hover": {
    //   backgroundColor: "yellow",
    //   borderColor: "yellow",
    //   "border-radius": "55px",
    //   width: "10%",
    // },
  };
  const TextStyle = {
    // "background-position": "center center",
    // "&:hover fieldset": {
    //   backgroundColor: "yellow",
    //   borderColor: "yellow",
    //   width: "10%",
    // },
    overflow: "hidden",
    "white-space": "nowrap",
    "text-overflow": "ellipsis",
    fontWeight: "bold",
    "font-size": "18px",
  };
  function MouseOver(event) {
    event.target.style.opacity = 0.5;
  }
  function MouseOut(event) {
    event.target.style.opacity = 1;
  }
  return (
    <>
      <div class="p-3">
        <div class="p-3 pb-1 border rounded">
          <div class="row" style={TextStyle}>
            <p>Title.....</p>
          </div>
          <div class="row pb-2">
            <img
              onMouseOver={MouseOver}
              onMouseOut={MouseOut}
              style={ImageStyle}
              src="https://mediafiles.cineplex.com/Central/Film/Posters/33420_768_1024.jpg"
              alt="Movie title didn't load"
            />
          </div>
          <div class="row">
            <button type="button" class="btn btn-dark">
              See similar
            </button>
          </div>
          <Stream />
        </div>
      </div>
    </>
  );
}
