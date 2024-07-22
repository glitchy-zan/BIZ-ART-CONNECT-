import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./customPages/LandingPage";
import LoginPage from "./customPages/LoginPage";
import RegisterPage from "./customPages/RegisterPage";
import ArtistDashboardPage from "./customPages/ArtistDashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route
          exact
          path="/artist/dashboard"
          element={<ArtistDashboardPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
