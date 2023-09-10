import { ContextProvider } from "./../ContextPage";
import TelemetryDetails from "../components/TelemetryDetails";

export default function Telemetry() {
  return (
    <ContextProvider>
      <div className="text-bg-dark">
        <TelemetryDetails />
      </div>
    </ContextProvider>
  );
}
