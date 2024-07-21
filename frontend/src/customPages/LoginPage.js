import React, { useState } from "react";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";
import style from "../customStyle/LandingPageStyle.module.css";
import formStyle from "../customStyle/FormStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userType: "artist", // Default to artist
    email: "",
    password: "",
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

    // strict naming! ART & BIZ having some identical attributes
    const submissionData = {
      mail: formData.email,
      encrypted_password: formData.password,
    };

    // ART
    if (formData.userType === "artist") {
      axios
        .post("http://88.200.63.148:8199/users/artistLogin", submissionData)
        .then((response) => {
          if (response.data.exists && response.data.password_match) {
            // navigate to artist dashboard
            navigate("/artist/dashboard");
          } else {
            setFormData({
              ...formData,
              email: "",
              password: "",
              submit_error: true,
            });
            console.log(response.data.error_detail);
          }
        });
      // BIZ
    } else {
      axios
        .post("http://88.200.63.148:8199/users/businessLogin", submissionData)
        .then((response) => {
          if (response.data.exists && response.data.password_match) {
            console.log("login succesful2");
          } else {
            setFormData({
              ...formData,
              email: "",
              password: "",
              submit_error: true,
            });
            console.log(response.data.error_detail);
          }
        });
    }
  };

  return (
    <>
      <LandingPageNavigation />
      <div className={style.contentSpacer}>
        <form
          onSubmit={handleSubmit}
          className={`${formStyle.formContainer} ${
            !formData.submit_error
              ? formStyle.formContainer2
              : formStyle.errorMark
          }`}
        >
          <h2>Login</h2>

          <label htmlFor="userType">I am:</label>
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

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    </>
  );
};

export default LoginPage;
