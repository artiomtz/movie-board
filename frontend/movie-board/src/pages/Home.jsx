import { ContextProvider } from "./../ContextPage";
import Title from "../components/Title";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <ContextProvider>
      <div className="text-bg-dark">
        <div className="row p-2 m-0">
          <div className="col-xxl-2"></div>
          <Title />
          <Carousel />
          <div className="col-xxl-2"></div>
        </div>
        <Search />
        <MovieList />
      </div>
    </ContextProvider>
  );
}
