import React, { useState } from "react";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";
import style from "../customStyle/LandingPageStyle.module.css";
import formStyle from "../customStyle/FormStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userType: "artist",
    // Shared fields
    email: "",
    password: "",
    // Artist fields
    name: "",
    lastName: "",
    pseudonym: "",
    artType: "",
    genre: "",
    artistLocation: "",
    // Business fields
    businessName: "",
    industry: "",
    businessLocation: "",
    description: "",
    commonProjects: "",
    //
    submit_error: false,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, submit_error: false });

    const submissionData = {
      userType: formData.userType,
      mail: formData.email,
      encrypted_password: formData.password,
      name: formData.name,
      last_name: formData.lastName,
      pseudonym: formData.pseudonym,
      art_type: formData.artType,
      genre: formData.genre,
      location: formData.artistLocation,
    };

    // if good then navigate to login
    axios
      .post("http://88.200.63.148:8199/users/artistRegister", submissionData)
      .then((response) => {
        if (!response.data.error) {
          navigate("/login");
        } else {
          setFormData({ ...formData, submit_error: true });
          console.log(response.data.error_detail);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**********************************************************************************************************************************************
   * Artist
   */

  const renderArtistForm = () => {
    return (
      <>
        <br />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="pseudonym">Pseudonym:</label>
        <input
          type="text"
          id="pseudonym"
          name="pseudonym"
          value={formData.pseudonym}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="artType">Art Type:</label>
        <input
          type="text"
          id="artType"
          name="artType"
          value={formData.artType}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="artistLocation">Location:</label>
        <input
          type="text"
          id="artistLocation"
          name="artistLocation"
          value={formData.artistLocation}
          onChange={handleChange}
          required
        />
      </>
    );
  };

  /**********************************************************************************************************************************************
   * Business
   */

  const renderBusinessForm = () => {
    return (
      <>
        <br />
        <label htmlFor="businessName">Business Name:</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="industry">Industry:</label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="businessLocation">Location:</label>
        <input
          type="text"
          id="businessLocation"
          name="businessLocation"
          value={formData.businessLocation}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="commonProjects">Common Projects:</label>
        <input
          type="text"
          id="commonProjects"
          name="commonProjects"
          value={formData.commonProjects}
          onChange={handleChange}
        />
      </>
    );
  };

  /**********************************************************************************************************************************************
   * Shared
   */

  return (
    <>
      <LandingPageNavigation />
      <form
        onSubmit={handleSubmit}
        className={`${style.contentSpacer} ${formStyle.formContainer} ${
          !formData.submit_error
            ? formStyle.formContainer2
            : formStyle.errorMark
        }`}
      >
        <h2>Register</h2>

        <label htmlFor="userType">I am registering as:</label>
        <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
        >
          <option value="artist">Artist</option>
          <option value="business">Business</option>
        </select>

        {formData.userType === "artist"
          ? renderArtistForm()
          : renderBusinessForm()}
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default RegisterPage;
