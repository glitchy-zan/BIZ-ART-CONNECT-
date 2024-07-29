const DB = require("../db/dbConn.js");
const express = require("express");
const workRouter = express.Router();

workRouter.post("/workCreate", async (req, res, next) => {
  try {
    const work = req.body;
    const portfolio_id = req.session.portfolio_id;
    work.portfolio_id = portfolio_id;
    await DB.workCreate(work);
    res.send({
      error: false,
      message: "Adding work successfull",
    });
  } catch (err) {
    console.log(err);
    res.send({
      error: true,
      error_detail: err,
      message: "Adding work failed",
    });
  }
});

workRouter.post("/workDelete", async (req, res, next) => {
  try {
    const work = req.body;
    const workId = work.id;
    await DB.workDelete(workId);
    res.send({
      error: false,
      message: "Deleting work successfull",
    });
  } catch (err) {
    res.send({
      error: true,
      message: "Deleting work failed",
    });
  }
});

module.exports = workRouter;
