import Carousel from "react-bootstrap/Carousel";

export default function UncontrolledExample() {
  const myStyle = {
    // width: "200px",
    // "object-position": center,
    // resizeMode: "contain",
    height: "250px",
    // "justify-content": center,
    // "background-position": "center center",
    // "background-repeat": "no-repeat",
    // overflow: "hidden",
    // height: "100%",
    // "min-height": "100%",
    width: "100%",
    "object-fit": "cover",
  };
  return (
    <div class="container">
      <Carousel>
        <Carousel.Item>
          <img
            style={myStyle}
            // className="d-block"
            src="https://mediafiles.cineplex.com/Central/Film/Posters/33420_768_1024.jpg"
            alt="Movie title didn't load"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={myStyle}
            // className="d-block h-10"
            src="https://wwwimage-us.pplusstatic.com/thumbnails/photos/w370-q80/movie_asset/15/33/69/mg_salone_poster_1400x2100.jpg"
            alt="Movie title didn't load"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={myStyle}
            // className="d-block mw-100"
            src="https://www.sanantoniothingstodo.com/wp-content/uploads/2021/06/SanAntonioMovies_featured2.jpg"
            alt="Movie title didn't load"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
