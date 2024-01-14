const express = require("express");
const app = express();
const DB = require("./db/dbConn.js");
const port = 8199;
const users = require("./routes/users.js");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", users);

app.get("/", (req, res, next) => {
  res.send("krneki");
});

///App listening on port
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${process.env.PORT || port}`);
});
