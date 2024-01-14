const express = require("express");
const app = express();
const DB = require("../db/dbConn.js");
const usersRouter = express.Router();

usersRouter.post("/artistRegister", async (req, res, next) => {
  try {
    const artist = req.body;
    var queryResult = await DB.artistCreate(artist);
    res.send("artist");
  } catch (err) {
    res.send(err);
    // - duplicate mail error
  }
});

module.exports = usersRouter;
