const express = require("express");
const app = express();
const DB = require("../db/dbConn.js");
const usersRouter = express.Router();

// return JSON with error indicator
usersRouter.post("/artistRegister", async (req, res, next) => {
  try {
    const artist = req.body;
    var queryResult = await DB.artistCreate(artist);
    console.log("no error!");
    res.send({
      error: false,
    });
  } catch (err) {
    console.log("error happened!");
    res.send({
      error: true,
      error_detail: err,
    });
  }
});

// return JSON with error indicator
usersRouter.post("/businessRegister", async (req, res, next) => {
  try {
    const business = req.body;
    var queryResult = await DB.businessCreate(business);
    console.log("no error!");
    res.send({
      error: false,
    });
  } catch (err) {
    console.log("error happened!");
    res.send({
      error: true,
      error_detail: err,
    });
  }
});

module.exports = usersRouter;
