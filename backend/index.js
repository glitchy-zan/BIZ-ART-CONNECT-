const express = require("express");
const app = express();
const DB = require("./db/dbConn.js");
const port = 8199;
const users = require("./routes/users.js");
require("dotenv").config();

app.use("/users", users);

app.get("/", (req, res, next) => {
  res.send("What the fuck");
});

///App listening on port
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${process.env.PORT || port}`);
});
