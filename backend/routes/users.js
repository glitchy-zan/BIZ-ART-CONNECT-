const express = require("express");
const app = express();
const DB = require("../db/dbConn.js");
const usersRouter = express.Router();

usersRouter.get("/artistRegister", async (req, res, next) => {
  try {
    let artist = {
      name: "John",
      last_name: "Novak",
      pseudonym: "Balonar",
      art_type: "kiparstvo",
      genre: "svobodno",
      location: "Brežice 9a",
      mail: "kurac21@gmail.com",
      encrypted_password: "***********",
    };
    var queryResult = await DB.artistCreate(artist);
    res.send("You have been hacked!");
  } catch (err) {
    res.send("Shit, it's an error!");
    // - duplicate mail error
  }
});

module.exports = usersRouter;
