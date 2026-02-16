import { Routes, Route } from "react-router-dom";
import RSVPPage from "./pages/RSVPPage";
import Home from "./pages/Home";
import Invitation from "./pages/Invitation";

function App() {
  return (
    <Routes>
      <Route path="/rsvp" element={<RSVPPage />} />
      <Route path="/rsvp/:code" element={<RSVPPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/invitation" element={<Invitation />} />
      <Route path="/invitation/:code" element={<Invitation />} />
    </Routes>
  );
}

export default App;
