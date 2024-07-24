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
    location: "",
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

    // strict naming! ART & BIZ having some identical attributes
    const submissionData = {
      // shared attr
      userType: formData.userType,
      name: formData.name,
      location: formData.artistLocation,
      mail: formData.email,
      encrypted_password: formData.password,
      // ART attr
      last_name: formData.lastName,
      pseudonym: formData.pseudonym,
      art_type: formData.artType,
      genre: formData.genre,
      // BIZ attr
      industry: formData.industry,
      description: formData.description,
      common_projects: formData.commonProjects,
    };

    // ART
    if (formData.userType === "artist") {
      axios
        .post("/users/artistRegister", submissionData)
        .then((response) => {
          // if no err then navigate to login
          if (!response.data.error) {
            navigate("/login");
          } else {
            setFormData({
              ...formData,
              email: "",
              password: "",
              location: "",
              name: "",
              lastName: "",
              pseudonym: "",
              artType: "",
              genre: "",
              artistLocation: "",
              submit_error: true,
            });
            console.log(response.data.error_detail);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // BIZ
    } else {
      axios
        .post("/users/businessRegister", submissionData)
        .then((response) => {
          // if no err then navigate to login
          if (!response.data.error) {
            navigate("/login");
          } else {
            setFormData({
              ...formData,
              email: "",
              password: "",
              location: "",
              businessName: "",
              industry: "",
              businessLocation: "",
              description: "",
              commonProjects: "",
              submit_error: true,
            });
            console.log(response.data.error_detail);
          }
        })
    }
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
        <select
          id="artType"
          name="artType"
          value={formData.artType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="">Select an art type</option>
          <option value="painting">Painting</option>
          <option value="sculpture">Sculpture</option>
          <option value="digital">Digital</option>
          <option value="photography">Photography</option>
          <option value="printmaking">Printmaking</option>
          <option value="ceramics">Ceramics</option>
          <option value="installation">Installation</option>
          <option value="performance">Performance</option>
          <option value="textile">Textile</option>
          <option value="mosaic">Mosaic</option>
          <option value="glass">Glass</option>
          <option value="calligraphy">Calligraphy</option>
          <option value="collage">Collage</option>
          <option value="graffiti">Graffiti</option>
          <option value="illustration">Illustration</option>
          <option value="video">Video</option>
          <option value="animation">Animation</option>
          <option value="conceptual">Conceptual Art</option>
          <option value="landArt">Land Art</option>
          <option value="mixedMedia">Mixed Media</option>
          <option value="architecture">Architecture</option>
          <option value="print">Print</option>
          <option value="drawing">Drawing</option>
          <option value="engraving">Engraving</option>
          <option value="fresco">Fresco</option>
          <option value="gouache">Gouache</option>
          <option value="iconography">Iconography</option>
          <option value="miniature">Miniature</option>
          <option value="murals">Murals</option>
          <option value="pastel">Pastel</option>
          <option value="publicArt">Public Art</option>
          <option value="relief">Relief</option>
          <option value="stainedGlass">Stained Glass</option>
          <option value="tapestry">Tapestry</option>
          <option value="tattoo">Tattoo</option>
          <option value="illustrative">Illustrative Art</option>
          <option value="Mixed">Design</option>
        </select>
        <br />
        <label htmlFor="genre">Genre:</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="abstract">Abstract</option>
          <option value="realism">Realism</option>
          <option value="surrealism">Surrealism</option>
          <option value="impressionism">Impressionism</option>
          <option value="expressionism">Expressionism</option>
          <option value="cubism">Cubism</option>
          <option value="futurism">Futurism</option>
          <option value="popArt">Pop Art</option>
          <option value="minimalism">Minimalism</option>
          <option value="baroque">Baroque</option>
          <option value="rococo">Rococo</option>
          <option value="neoclassicism">Neoclassicism</option>
          <option value="romanticism">Romanticism</option>
          <option value="symbolism">Symbolism</option>
          <option value="artNouveau">Art Nouveau</option>
          <option value="artDeco">Art Deco</option>
          <option value="photorealism">Photorealism</option>
          <option value="streetArt">Street Art</option>
          <option value="folkArt">Folk Art</option>
          <option value="conceptual">Conceptual Art</option>
          <option value="installation">Installation Art</option>
          <option value="performance">Performance Art</option>
          <option value="graffiti">Graffiti</option>
          <option value="contemporary">Contemporary</option>
          <option value="urbanArt">Urban Art</option>
          <option value="postModernism">Post-Modernism</option>
          <option value="digitalArt">Digital Art</option>
          <option value="classical">Classical</option>
          <option value="gothic">Gothic</option>
          <option value="renaissance">Renaissance</option>
          <option value="mannerism">Mannerism</option>
          <option value="romanesque">Romanesque</option>
          <option value="naiveArt">Naive Art</option>
          <option value="outsiderArt">Outsider Art</option>
          <option value="fauvism">Fauvism</option>
          <option value="opArt">Op Art</option>
          <option value="kineticArt">Kinetic Art</option>
          <option value="Mixed">Constructivism</option>
        </select>
        <br />
        <label htmlFor="artistLocation">Location:</label>
        <input
          type="text"
          id="artistLocation"
          name="artistLocation"
          value={formData.artistLocation}
          onChange={handleChange}
          list="locationOptions"
          required
        />
        <datalist id="locationOptions">
          <option value="New York"></option>
          <option value="Los Angeles"></option>
          <option value="Chicago"></option>
          <option value="Houston"></option>
          <option value="Phoenix"></option>
          <option value="Philadelphia"></option>
          <option value="San Antonio"></option>
          <option value="San Diego"></option>
          <option value="Dallas"></option>
          <option value="San Jose"></option>
          <option value="Austin"></option>
          <option value="Jacksonville"></option>
          <option value="Fort Worth"></option>
          <option value="Columbus"></option>
          <option value="San Francisco"></option>
          <option value="Charlotte"></option>
          <option value="Indianapolis"></option>
          <option value="Seattle"></option>
          <option value="Denver"></option>
          <option value="Washington"></option>
          <option value="Boston"></option>
          <option value="El Paso"></option>
          <option value="Nashville"></option>
          <option value="Detroit"></option>
          <option value="Oklahoma City"></option>
          <option value="Portland"></option>
          <option value="Las Vegas"></option>
          <option value="Memphis"></option>
          <option value="Louisville"></option>
          <option value="Baltimore"></option>
          <option value="Milwaukee"></option>
          <option value="Albuquerque"></option>
          <option value="Tucson"></option>
          <option value="Fresno"></option>
          <option value="Sacramento"></option>
          <option value="Kansas City"></option>
          <option value="Long Beach"></option>
          <option value="Mesa"></option>
          <option value="Atlanta"></option>
          <option value="Colorado Springs"></option>
          <option value="Virginia Beach"></option>
          <option value="Raleigh"></option>
          <option value="Omaha"></option>
          <option value="Miami"></option>
          <option value="Oakland"></option>
          <option value="Minneapolis"></option>
          <option value="Tulsa"></option>
          <option value="Arlington"></option>
          <option value="New Orleans"></option>
          <option value="Amsterdam"></option>
          <option value="Andorra la Vella"></option>
          <option value="Athens"></option>
          <option value="Belgrade"></option>
          <option value="Berlin"></option>
          <option value="Bern"></option>
          <option value="Bratislava"></option>
          <option value="Brussels"></option>
          <option value="Bucharest"></option>
          <option value="Budapest"></option>
          <option value="Chisinau"></option>
          <option value="Copenhagen"></option>
          <option value="Dublin"></option>
          <option value="Helsinki"></option>
          <option value="Kiev"></option>
          <option value="Lisbon"></option>
          <option value="Ljubljana"></option>
          <option value="London"></option>
          <option value="Luxembourg"></option>
          <option value="Madrid"></option>
          <option value="Minsk"></option>
          <option value="Monaco"></option>
          <option value="Moscow"></option>
          <option value="Oslo"></option>
          <option value="Paris"></option>
          <option value="Podgorica"></option>
          <option value="Prague"></option>
          <option value="Reykjavik"></option>
          <option value="Riga"></option>
          <option value="Rome"></option>
          <option value="San Marino"></option>
          <option value="Sarajevo"></option>
          <option value="Skopje"></option>
          <option value="Sofia"></option>
          <option value="Stockholm"></option>
          <option value="Tallinn"></option>
          <option value="Tirana"></option>
          <option value="Vaduz"></option>
          <option value="Valletta"></option>
          <option value="Vienna"></option>
          <option value="Vilnius"></option>
          <option value="Warsaw"></option>
          <option value="Zagreb"></option>
        </datalist>
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
          list="locationOptions"
          required
        />
        <datalist id="locationOptions">
          <option value="New York"></option>
          <option value="Los Angeles"></option>
          <option value="Chicago"></option>
          <option value="Houston"></option>
          <option value="Phoenix"></option>
          <option value="Philadelphia"></option>
          <option value="San Antonio"></option>
          <option value="San Diego"></option>
          <option value="Dallas"></option>
          <option value="San Jose"></option>
          <option value="Austin"></option>
          <option value="Jacksonville"></option>
          <option value="Fort Worth"></option>
          <option value="Columbus"></option>
          <option value="San Francisco"></option>
          <option value="Charlotte"></option>
          <option value="Indianapolis"></option>
          <option value="Seattle"></option>
          <option value="Denver"></option>
          <option value="Washington"></option>
          <option value="Boston"></option>
          <option value="El Paso"></option>
          <option value="Nashville"></option>
          <option value="Detroit"></option>
          <option value="Oklahoma City"></option>
          <option value="Portland"></option>
          <option value="Las Vegas"></option>
          <option value="Memphis"></option>
          <option value="Louisville"></option>
          <option value="Baltimore"></option>
          <option value="Milwaukee"></option>
          <option value="Albuquerque"></option>
          <option value="Tucson"></option>
          <option value="Fresno"></option>
          <option value="Sacramento"></option>
          <option value="Kansas City"></option>
          <option value="Long Beach"></option>
          <option value="Mesa"></option>
          <option value="Atlanta"></option>
          <option value="Colorado Springs"></option>
          <option value="Virginia Beach"></option>
          <option value="Raleigh"></option>
          <option value="Omaha"></option>
          <option value="Miami"></option>
          <option value="Oakland"></option>
          <option value="Minneapolis"></option>
          <option value="Tulsa"></option>
          <option value="Arlington"></option>
          <option value="New Orleans"></option>
          <option value="Amsterdam"></option>
          <option value="Andorra la Vella"></option>
          <option value="Athens"></option>
          <option value="Belgrade"></option>
          <option value="Berlin"></option>
          <option value="Bern"></option>
          <option value="Bratislava"></option>
          <option value="Brussels"></option>
          <option value="Bucharest"></option>
          <option value="Budapest"></option>
          <option value="Chisinau"></option>
          <option value="Copenhagen"></option>
          <option value="Dublin"></option>
          <option value="Helsinki"></option>
          <option value="Kiev"></option>
          <option value="Lisbon"></option>
          <option value="Ljubljana"></option>
          <option value="London"></option>
          <option value="Luxembourg"></option>
          <option value="Madrid"></option>
          <option value="Minsk"></option>
          <option value="Monaco"></option>
          <option value="Moscow"></option>
          <option value="Oslo"></option>
          <option value="Paris"></option>
          <option value="Podgorica"></option>
          <option value="Prague"></option>
          <option value="Reykjavik"></option>
          <option value="Riga"></option>
          <option value="Rome"></option>
          <option value="San Marino"></option>
          <option value="Sarajevo"></option>
          <option value="Skopje"></option>
          <option value="Sofia"></option>
          <option value="Stockholm"></option>
          <option value="Tallinn"></option>
          <option value="Tirana"></option>
          <option value="Vaduz"></option>
          <option value="Valletta"></option>
          <option value="Vienna"></option>
          <option value="Vilnius"></option>
          <option value="Warsaw"></option>
          <option value="Zagreb"></option>
        </datalist>
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
