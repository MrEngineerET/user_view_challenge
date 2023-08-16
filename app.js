const express = require("express");
const { openMongooseConnection } = require("./db");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 9090;
openMongooseConnection("mongodb://127.0.0.1:27017/userView")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express app listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Error opening Mongoose connection", error));
