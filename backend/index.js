const express = require("express");
const app = express();

const port = 8199;

app.get("/", (req, res) => {
  res.send("");
});

///App listening on port
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${process.env.PORT || port}`);
});