import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Telemetry from "./pages/Telemetry";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:showType/:showId" element={<Details />} />
      <Route path="/telemetry" element={<Telemetry />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
