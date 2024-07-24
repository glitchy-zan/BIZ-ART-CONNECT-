const DB = require("../db/dbConn.js");
const express = require("express");
const usersRouter = express.Router();

/*****************************************************************************************************************************/
/** Artist REGISTER */

usersRouter.post("/artistRegister", async (req, res, next) => {
  try {
    const artist = req.body;
    var queryResult = await DB.artistCreate(artist);
    res.send({
      error: false,
      error_detail: null,
      message: "Registration successful",
    });
  } catch (err) {
    res.send({
      error: true,
      error_detail: err,
      message: "Registration failed",
    });
  }
});

/*****************************************************************************************************************************/
/** Business REGISTER */

usersRouter.post("/businessRegister", async (req, res, next) => {
  try {
    const business = req.body;
    var queryResult = await DB.businessCreate(business);
    res.send({
      error: false,
      error_detail: null,
      message: "Registration successful",
    });
  } catch (err) {
    res.send({
      error: true,
      error_detail: err,
      message: "Registration failed",
    });
  }
});

/*****************************************************************************************************************************/
/** Artist LOGIN */

usersRouter.post("/artistLogin", async (req, res, next) => {
  try {
    let queryResult = await DB.artistReadByMail(req.body.mail);
    let pass_match =
      req.body.encrypted_password === queryResult.artist.encrypted_password;

    if (queryResult.exists && pass_match) {
      // session specific
      req.session.id = queryResult.id;
      req.session.isLoggedIn = true;
      // artist info
      req.session.userType = "artist";
      req.session.artist_id = queryResult.artist.id;
      req.session.name = queryResult.artist.name;
      req.session.last_name = queryResult.artist.last_name;
      req.session.pseudonym = queryResult.artist.pseudonym;
      req.session.art_type = queryResult.artist.art_type;
      req.session.genre = queryResult.artist.genre;
      req.session.location = queryResult.artist.location;
      req.session.mail = queryResult.artist.mail;
      req.session.encrypted_password = queryResult.artist.encrypted_password;

      res.send({
        error: false,
        error_detail: null,
        message: "Login successful",
      });
    } else {
      res.send({
        error: true,
        error_detail: null,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    res.send({
      error: true,
      error_detail: err,
      message: "Login failed",
    });
  }
});

/*****************************************************************************************************************************/
/** Business LOGIN */

usersRouter.post("/businessLogin", async (req, res, next) => {
  try {
    const inputData = req.body;
    var queryResult = await DB.businessReadByMail(inputData.mail);

    let pass_match = false;
    if (queryResult.exists) {
      pass_match =
        inputData.encrypted_password ===
        queryResult.business.encrypted_password;
    }
    res.send({
      error: false,
      error_detail: null,
      message: "Login successful",
    });
  } catch (err) {
    res.send({
      error: true,
      error_detail: err,
      message: "Login failed",
    });
  }
});

/*****************************************************************************************************************************/
/** Portfolio CREATE */

usersRouter.post("/portfolioCreate", async (req, res, next) => {
  try {
    const portfolio = req.body;
    var queryResult = await DB.portfolioCreate(portfolio);
    // update portfolio on artist
    try {
      var artist = await DB.artistReadByMail(req.session.mail);
      artist = artist.artist;
      artist = { ...artist, portfolio_id: queryResult.portfolio_id };
      await DB.artistUpdate(artist);
    } catch (err) {
      res.send({
        error: true,
        error_detail: err,
        message: "When portfolio created, artist update failed",
      });
    }

    res.send({
      error: false,
      error_detail: null,
      message: "Portfolio created",
    });
  } catch (err) {
    res.send({
      error: true,
      error_detail: err,
      message: "Portfolio creation failed",
    });
  }
});

module.exports = usersRouter;
