import { Routes, Route } from "react-router-dom";
import RSVPPage from "./pages/RSVPPage";
import Home from "./pages/Home";
import Invitation from "./pages/Invitation";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/invitation" element={<Invitation />} />
        <Route path="/rsvp" element={<RSVPPage />} />
      </Route>
    </Routes>
  );
}

export default App;
