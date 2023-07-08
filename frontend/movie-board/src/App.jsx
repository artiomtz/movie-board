import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:showType/:showId" element={<Details />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
