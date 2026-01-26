import { Routes, Route } from "react-router-dom";
import RSVPPage from "./pages/RSVPPage";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/rsvp" element={<RSVPPage />} />
      <Route path="/rsvp/:code" element={<RSVPPage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
