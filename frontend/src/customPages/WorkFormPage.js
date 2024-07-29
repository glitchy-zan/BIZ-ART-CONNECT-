import React, { useState, useEffect } from "react";
import formStyle from "../customStyle/FormStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FooterFix } from "../customComponents/Footer";
import ArtistNavigation from "../customComponents/ArtistNavigation";

const WorkFormPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    medium: "",
    creation_date: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDateTimeForMySQL = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, submit_error: false });
    const currentDateTime = formatDateTimeForMySQL(new Date());
    const dataToSubmit = {
      ...formData,
      creation_date: currentDateTime,
    };
    axios
      .post("/work/workCreate", dataToSubmit)
      .then((res) => {
        navigate("/artist/portfolio/work");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ArtistNavigation />
      <form
        onSubmit={handleSubmit}
        className={`${formStyle.formContainer} ${
          !formData.submit_error
            ? formStyle.formContainer2
            : formStyle.errorMark
        }`}
      >
        <h2>ADD WORK SECTION</h2>

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="medium">Medium:</label>
        <input
          type="text"
          id="medium"
          name="medium"
          value={formData.medium}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input type="submit" value="Submit" />
      </form>
      <FooterFix />
    </>
  );
};

export default WorkFormPage;
