import { ContextProvider } from "./../ContextPage";
import MovieDetails from "../components/MovieDetails";

export default function Details() {
  return (
    <ContextProvider>
      <div className="text-bg-dark">
        <MovieDetails />
      </div>
    </ContextProvider>
  );
}
