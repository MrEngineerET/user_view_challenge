const express = require("express");
const { openMongooseConnection } = require("./db");
const {
  getDailyUserView,
  getWeeklyUserView,
  getMonthlyUserView,
  getCustomDateUserView,
} = require("./controller/userViewController");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/userView/daily", getDailyUserView);
app.get("/userView/weekly", getWeeklyUserView);
app.get("/userView/monthly", getMonthlyUserView);
app.post("/userView/custom", getCustomDateUserView);

const PORT = process.env.PORT || 9090;
openMongooseConnection("mongodb://127.0.0.1:27017/userView")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express app listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Error opening Mongoose connection", error));
