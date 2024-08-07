const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../.env") });
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8000;
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`SERVER LISTENING ON : ${PORT}`);
});

module.exports = app;
