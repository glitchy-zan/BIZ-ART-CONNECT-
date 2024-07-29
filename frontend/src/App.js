import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./customPages/LandingPage";
import LoginPage from "./customPages/LoginPage";
import RegisterPage from "./customPages/RegisterPage";
import ArtistDashboardPage from "./customPages/ArtistDashboardPage";
import PortfolioPage from "./customPages/PortfolioPage";
import WorkPage from "./customPages/WorkPage";
import AwardPage from "./customPages/AwardPage";
import ExperiencePage from "./customPages/ExperiencePage";
import WorkFormPage from "./customPages/WorkFormPage";
import PersonalInfoPage from "./customPages/PersonalInfoPage";
import TrendingPage from "./customPages/TrendingPage";
import ProfileSettingPage from "./customPages/ProfileSettingsPage";

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
        <Route exact path="/artist/portfolio" element={<PortfolioPage />} />
        <Route exact path="/artist/portfolio/work" element={<WorkPage />} />
        <Route exact path="/artist/portfolio/award" element={<AwardPage />} />
        <Route
          exact
          path="/artist/portfolio/experience"
          element={<ExperiencePage />}
        />
        <Route
          exact
          path="/artist/portfolio/work/add"
          element={<WorkFormPage />}
        />
        <Route
          exact
          path="/artist/personalInfo"
          element={<PersonalInfoPage />}
        />
        <Route exact path="/artist/trending" element={<TrendingPage />} />
        <Route
          exact
          path="/artist/profileSettings"
          element={<ProfileSettingPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
