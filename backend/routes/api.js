const { error } = require("console");
const DB = require("../db/dbConn.js");
const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/session", (req, res) => {
  res.send({
    isLoggedIn: req.session.isLoggedIn,
    userType: req.session.userType,
    artist_id: req.session.artist_id,
    name: req.session.name,
    last_name: req.session.last_name,
    pseudonym: req.session.pseudonym,
    art_type: req.session.art_type,
    genre: req.session.genre,
    location: req.session.location,
    mail: req.session.mail,
    encrypted_password: req.session.encrypted_password,
  });
});

apiRouter.get("/portfolioFetch", async (req, res) => {
  var artist = await DB.artistReadByMail(req.session.mail);
  artist = artist.artist;
  var queryResult = null;
  if (artist && artist.portfolio_id) {
    queryResult = await DB.portfolioReadByID(artist.portfolio_id);
  }
  if (queryResult && queryResult.exists) {
    res.send({
      exists: true,
      artist_description: queryResult.artist_representation,
    });
  } else {
    res.send({
      exists: false,
    });
  }
});

apiRouter.get("/workFetch", async (req, res) => {
  var artist = await DB.artistReadByMail(req.session.mail);
  artist = artist.artist;
  var queryResult = null;
  if (artist && artist.portfolio_id) {
    queryResult = await DB.workReadByPortfolioId(artist.portfolio_id);
  }
  if (queryResult && queryResult.exists) {
    res.send({
      exists: true,
      work: queryResult.work,
    });
  } else {
    res.send({
      exists: false,
    });
  }
});

apiRouter.get("/artist/trending/getAll", async (req, res) => {
  // fetch all for now
  const allArtists = await DB.artistReadAll();
  if (allArtists.exists) {
    res.send({
      error: false,
      artists: allArtists.artist,
    });
  } else {
    res.send({
      error: true,
    });
  }
});

module.exports = apiRouter;
