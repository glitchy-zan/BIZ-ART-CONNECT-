const express = require("express");
const app = express();
const port = 8199;

const DB = require("./db/dbConn.js");
require("dotenv").config();

const session = require("express-session");

const users = require("./routes/users.js");
const api = require("./routes/api.js");
const image = require("./routes/image.js");
const work = require("./routes/work.js");

const bodyParser = require("body-parser");
const cors = require("cors");

app.use("/uploads", express.static("uploads"));

app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", users);
app.use("/api", api);
app.use("/image", image);
app.use("/work", work);

app.get("/", (req, res, next) => {
  res.send("");
});

///App listening on port
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${process.env.PORT || port}`);
});
