import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArtistNavigation from "../customComponents/ArtistNavigation";
import Container1 from "../customComponents/Container1";
import Container2 from "../customComponents/Container2";
import { Footer, FooterFix } from "../customComponents/Footer";
import { Circles } from "react-loader-spinner";

const ArtistDashboardPage = () => {
  const [artistData, setArtistData] = useState({
    user_type: "",
    artist_id: "",
    name: "",
    last_name: "",
    pseudonym: "",
    art_type: "",
    genre: "",
    location: "",
    mail: "",
    encrypted_password: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchSessionData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/session");
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  useEffect(() => {
    fetchSessionData().then((sessionData) => {
      if (sessionData) {
        setArtistData({
          userType: sessionData.userType || "undefined",
          artist_id: sessionData.artist_id || "undefined",
          name: sessionData.name || "undefined",
          last_name: sessionData.last_name || "undefined",
          pseudonym: sessionData.pseudonym || "undefined",
          art_type: sessionData.art_type || "undefined",
          genre: sessionData.genre || "undefined",
          location: sessionData.location || "undefined",
          mail: sessionData.mail || "undefined",
          encrypted_password: sessionData.encrypted_password || "undefined",
        });
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/artist/personalInfo");
  };

  const handlePortfolioClick = () => {
    navigate("/artist/portfolio");
  };

  const handleQuickStatsClick = () => {
    console.log("clicked3");
  };

  const handleProfileSettingsClick = () => {
    navigate("/artist/profileSettings");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Circles
          height="80"
          width="80"
          color="#333"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <ArtistNavigation />
      <Container1 onClick={handleProfileClick}>
        <h2>Personal info</h2>
        {artistData.artist_id ? (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <p
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  borderRadius: "15px",
                  padding: "10px",
                  margin: "5px",
                }}
              >
                Pseudonym
              </p>
              <p>{artistData.pseudonym}</p>
            </div>
            <div>
              <p
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  borderRadius: "15px",
                  padding: "10px",
                  margin: "5px",
                }}
              >
                Art Type
              </p>
              <p> {artistData.art_type}</p>
            </div>
            <div>
              <p
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  borderRadius: "15px",
                  padding: "10px",
                  margin: "5px",
                }}
              >
                Genre
              </p>
              <p>{artistData.genre}</p>
            </div>
          </div>
        ) : (
          <p class="unavailable">Unavailable.</p>
        )}
      </Container1>
      <Container2 onClick={handlePortfolioClick}>
        <h2>Portfolio</h2>
        <p>See your portfolio.</p>
      </Container2>
      <Container1 onClick={handleQuickStatsClick}>
        <h2>Quick stats</h2>
        <p>Unavailable.</p>
      </Container1>
      <Container2 onClick={handleProfileSettingsClick}>
        <h2>Profile settings</h2>
        <p>Unavailable.</p>
      </Container2>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ArtistDashboardPage;
