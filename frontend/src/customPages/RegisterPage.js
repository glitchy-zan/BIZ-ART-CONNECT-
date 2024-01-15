import React from "react";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";
import style from "../customStyle/LandingPageStyle.module.css";
import formStyle from "../customStyle/FormStyle.module.css";
import axios from "axios";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      submit_error: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      userType: this.state.userType,
      mail: this.state.email,
      encrypted_password: this.state.password,
      name: this.state.name,
      last_name: this.state.lastName,
      pseudonym: this.state.pseudonym,
      art_type: this.state.artType,
      genre: this.state.genre,
      location: this.state.artistLocation,
    };

    axios
      .post("http://88.200.63.148:8199/users/artistRegister", formData)
      .then((response) => {
        if (!response.data.error) {
          ///////
        } else {
          this.setState({ submit_error: true }, () => {
            console.log(response.data.error_detail);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**********************************************************************************************************************************************
   * Artist
   */

  renderArtistForm() {
    return (
      <>
        <br />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <br />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
          required
        />
        <br />
        <label htmlFor="pseudonym">Pseudonym:</label>
        <input
          type="text"
          id="pseudonym"
          name="pseudonym"
          value={this.state.pseudonym}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="artType">Art Type:</label>
        <input
          type="text"
          id="artType"
          name="artType"
          value={this.state.artType}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={this.state.genre}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="artistLocation">Location:</label>
        <input
          type="text"
          id="artistLocation"
          name="artistLocation"
          value={this.state.artistLocation}
          onChange={this.handleChange}
          required
        />
      </>
    );
  }

  /**********************************************************************************************************************************************
   * Business
   */

  renderBusinessForm() {
    return (
      <>
        <br />
        <label htmlFor="businessName">Business Name:</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={this.state.businessName}
          onChange={this.handleChange}
          required
        />
        <br />
        <label htmlFor="industry">Industry:</label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={this.state.industry}
          onChange={this.handleChange}
          required
        />
        <br />
        <label htmlFor="businessLocation">Location:</label>
        <input
          type="text"
          id="businessLocation"
          name="businessLocation"
          value={this.state.businessLocation}
          onChange={this.handleChange}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          required
        />
        <br />
        <label htmlFor="commonProjects">Common Projects:</label>
        <input
          type="text"
          id="commonProjects"
          name="commonProjects"
          value={this.state.commonProjects}
          onChange={this.handleChange}
        />
      </>
    );
  }

  /**********************************************************************************************************************************************
   * Shared
   */

  render() {
    return (
      <>
        <LandingPageNavigation />
        <form
          onSubmit={this.handleSubmit}
          className={`${style.contentSpacer} ${formStyle.formContainer} ${
            !this.state.submit_error
              ? formStyle.formContainer2
              : formStyle.errorMark
          }`}
        >
          <h2>Register</h2>

          <label htmlFor="userType">I am registering as:</label>
          <select
            id="userType"
            name="userType"
            value={this.state.userType}
            onChange={this.handleChange}
            required
          >
            <option value="artist">Artist</option>
            <option value="business">Business</option>
          </select>

          {this.state.userType === "artist"
            ? this.renderArtistForm()
            : this.renderBusinessForm()}
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <input type="submit" value="Register" />
        </form>
      </>
    );
  }
}

export default RegisterPage;
