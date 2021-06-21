// jshint esversion:9

const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();

const apiGamesRoutes = require("./routes/api-games-routes");
const apiNewRoutes = require("./routes/api-new-routes");
const apiTopRoutes = require("./routes/api-top-routes");
const apiPlatformsRoutes = require("./routes/api-platforms-routes");
const apiGenresRoutes = require("./routes/api-genres-routes");
const apiSearchGamesRoutes = require("./routes/api-search-games-routes");
const contactAndAbout = require("./routes/contact-about");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


app.get('/favicon.ico', function(req, res) { res.status(204); });

app.use(apiGamesRoutes);

app.use(apiNewRoutes);

app.use(apiTopRoutes);

app.use(contactAndAbout);

app.use(apiPlatformsRoutes);

app.use(apiGenresRoutes);

app.use(apiSearchGamesRoutes);


app.listen(process.env.PORT || 3000, function() {
  console.log("CORS-enabled, server running on port 3000");
});
