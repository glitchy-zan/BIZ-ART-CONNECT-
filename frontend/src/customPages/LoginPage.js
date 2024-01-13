import React from "react";
import LandingPageNavigation from "../customComponents/LandingPageNavigation";
import style from "../customStyle/LandingPageStyle.module.css";
import formStyle from "../customStyle/FormStyle.module.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "artist", // Default to artist
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <>
        <LandingPageNavigation />
        <div className={style.contentSpacer}>
          <form onSubmit={this.handleSubmit} className={formStyle.formContainer}>
            <h2>Login</h2>

            <label htmlFor="userType">I am a(n):</label>
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

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <input type="submit" value="Login" />
          </form>
        </div>
      </>
    );
  }
}

export default LoginPage;
