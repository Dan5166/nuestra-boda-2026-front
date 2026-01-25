import { Routes, Route } from "react-router-dom";
import RSVPPage from "./components/RSVPPage";

function App() {
  return (
    <Routes>
        <Route path="/rsvp" element={<RSVPPage />} />
        <Route path="/rsvp/:code" element={<RSVPPage />} />
      </Routes>
  );
}

export default App;
