const mongoose = require("mongoose");

const PORT = process.env.PORT || 9090;
async function openMongooseConnection(DB_URI) {
  if (DB_URI) {
    await mongoose.connect(DB_URI);
    console.log("Mongoose connection opened successfully");
  } else {
    throw new Error("No DB_URI found in process.env");
  }
}

async function closeMongooseConnection() {
  await mongoose.connection.close();
  console.log("Mongoose connection closed successfully");
}

module.exports = {
  openMongooseConnection,
  closeMongooseConnection,
  mongoose,
};
