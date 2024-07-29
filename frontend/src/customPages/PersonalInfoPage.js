import React, { useState, useEffect } from "react";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";
import style from "../customStyle/LandingPageStyle.module.css";
import formStyle from "../customStyle/FormStyle.module.css";
import axios from "axios";
import { generatePath, useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import ArtistNavigation from "../customComponents/ArtistNavigation";
import { Footer } from "../customComponents/Footer";

const PersonalInfoPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    pseudonym: "",
    art_type: "",
    genre: "",
    location: "",
    mail: "",
    encrypted_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, submit_error: false });
  };

  const fetchArtistData = async () => {
    axios
      .get("/api/session")
      .then((res) => {
        setFormData({
          name: res.data.name,
          last_name: res.data.last_name,
          pseudonym: res.data.pseudonym,
          art_type: res.data.art_type,
          genre: res.data.genre,
          location: res.data.location,
          mail: res.data.mail,
          encrypted_password: res.data.encrypted_password,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchArtistData();
  }, []);

  return (
    <>
      <ArtistNavigation />
      <div className={style.contentSpacer}>
        <form
          onSubmit={handleSubmit}
          className={`${formStyle.formContainer} ${
            !formData.submit_error
              ? formStyle.formContainer2
              : formStyle.errorMark
          }`}
        >
          <h2>Personal Info</h2>

          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="last_name">Last name:</label>
          <input
            type="last_name"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="pseudonym">Pseudonym:</label>
          <input
            type="pseudonym"
            id="pseudonym"
            name="pseudonym"
            value={formData.pseudonym}
            onChange={handleChange}
            required
          />

          <label htmlFor="art_type">Art type:</label>
          <input
            type="art_type"
            id="art_type"
            name="art_type"
            value={formData.art_type}
            onChange={handleChange}
            required
          />

          <label htmlFor="genre">Genre:</label>
          <input
            type="genre"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location:</label>
          <input
            type="location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="mail">Email:</label>
          <input
            type="mail"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />

          <label htmlFor="encrypted_password">Password:</label>
          <input
            type="encrypted_password"
            id="encrypted_password"
            name="encrypted_password"
            value={formData.encrypted_password}
            onChange={handleChange}
            required
          />

          <input type="submit" value="Update" />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PersonalInfoPage;
