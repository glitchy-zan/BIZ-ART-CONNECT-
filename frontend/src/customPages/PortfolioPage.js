import React, { useState, useEffect } from "react";
import ArtistNavigation from "../customComponents/ArtistNavigation";
import style from "../customStyle/LandingPageStyle.module.css";
import formStyle from "../customStyle/FormStyle.module.css";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Container3 from "../customComponents/Container3";
import Container4 from "../customComponents/Container4";
import { Footer, FooterFix } from "../customComponents/Footer";
import { useNavigate } from "react-router-dom";

const PortfolioPage = () => {
  // for form stuff
  const [formData, setFormData] = useState({
    artistDescription: "",
  });

  // for representing stuff
  const [portfolioData, setPortfolioData] = useState({
    portfolioExists: false,
    artistDescription: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get("/api/portfolioFetch");
      if (response.data.exists) {
        setPortfolioData({
          ...portfolioData,
          portfolioExists: true,
          artistDescription: response.data.artist_description,
        });
      } else {
        setPortfolioData({
          ...portfolioData,
          portfolioExists: false,
        });
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  useEffect(() => {
    const loadPortfolio = async () => {
      setLoading(true);
      await fetchPortfolio();
      setLoading(false);
    };
    loadPortfolio();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const submissionData = {
      artist_representation: formData.artistDescription,
    };
    console.log(submissionData);

    axios.post("/users/portfolioCreate", submissionData).then((response) => {
      if (!response.data.error) {
        window.location.reload();
      } else {
        setFormData({
          ...formData,
          artistDescription: "",
        });
        console.log(response.data.error_detail);
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const navigateToWork = () => {
    navigate("/artist/portfolio/work");
  };

  const navigateToAwards = () => {
    navigate("/artist/portfolio/award");
  };

  const navigateToExperience = () => {
    navigate("/artist/portfolio/experience");
  };

  const hasPortfolio = () => {
    return (
      <Container3>
        <Container4 onClick={navigateToWork}>
          <div>WORK</div>
          <br />
          <div>Click to see and add work</div>
        </Container4>
        <Container4 onClick={navigateToAwards}>
          <div>AWARDS</div>
          <br />
          <div>Click to see and add awards</div>
        </Container4>
        <Container4 onClick={navigateToExperience}>
          <div>EXPERIENCE</div>
          <br />
          <div>Click to see and add experience</div>
        </Container4>
      </Container3>
    );
  };

  const noPortfolio = () => {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className={`${style.contentSpacer} ${formStyle.formContainer} ${formStyle.formContainer2}`}
        >
          <label style={{ textAlign: "center" }} htmlFor="artistDescription">
            Write your description!
          </label>
          <br />
          <input
            type="text"
            id="artistDescription"
            name="artistDescription"
            value={formData.artistDescription}
            onChange={handleChange}
            maxLength="500"
            required
          />
          <br />
          <input type="submit" value="Create" />
        </form>
      </>
    );
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
      <h1 style={{ margin: "80px", textAlign: "center", fontSize: "50px" }}>
        PORTFOLIO
      </h1>
      {portfolioData.portfolioExists ? hasPortfolio() : noPortfolio()}
      <FooterFix />
    </>
  );
};

export default PortfolioPage;
