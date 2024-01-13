import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./customPages/LandingPage";
import LoginPage from "./customPages/LoginPage";
import RegisterPage from "./customPages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;