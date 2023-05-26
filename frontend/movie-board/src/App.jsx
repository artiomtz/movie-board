import "bootstrap/dist/css/bootstrap.css";
import Movie from "./components/Movie";
import Search from "./components/Search";
import Carousel from "./components/Carousel";

export default function App() {
  return (
    <div class="text-bg-dark">
      <div class="p-4 container">
        <div class="row">
          <Carousel />
        </div>
      </div>

      <div class="p-2 pe-0 container col-8 col-sm-6 col-md-6 col-lg-6 col-xl-4 sticky-top">
        <div class="row">
          <Search />
        </div>
      </div>

      <div class="container text-center">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4">
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
        </div>
      </div>
    </div>
  );
}
