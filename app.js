const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log("Express app starts listening on ", PORT);
});
