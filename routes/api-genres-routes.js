// jshint esversion:9

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}));


let today = (new Date().getTime() / 1000).toFixed(0);

// Genres games routes
// Function to request items from the api
function apiRequestGenreGames(sortBy, filter, name, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: 'fields total_rating,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 500; sort ' + sortBy + '; where genres.slug = "' + name + '" & cover.image_id != null & first_release_date <=' + today + ' & first_release_date != null & genres != null & platforms != null & platforms.name != null & total_rating != null' + filter + ';'
  })
  .then(response => {
    console.log(response.data);
    if(response.data.length === 0) {
      res.render("404", {
        jsContactAbout: "../js/contact-about.js",
        cssStyles: "../css/styles.css",
        cssContactAbout404Responsive: "../css/contact-about-404-responsive.css",
        cssContactAbout404: "../css/contact-about-404.css"
      });
    }
    else {
      res.render("index", {
        results: response.data,
        title: name,
        cssSrc: "../css/styles.css",
        cssResponsive: "../css/styles-responsive.css",
        jsGameFunc: "../js/games-functions.js",
        jsGamesOrderMenu: "../js/games-order-menu.js",
        jsSrc: "../js/index.js",
        jsSidebar: "../js/sidebar-scroll.js",
        jsAutoSearch: "../js/autocomplete.js"
      });
    }
  })
  .catch(err => {
    console.error(err);
    res.render("404", {
      jsContactAbout: "../js/contact-about.js",
      cssStyles: "../css/styles.css",
      cssContactAbout404Responsive: "../css/contact-about-404-responsive.css",
      cssContactAbout404: "../css/contact-about-404.css"
    });
  });
}

router.get("/genres/:name", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = " & total_rating_count > 10";
  let name = req.params.name;

  apiRequestGenreGames(sortBy, filter, name, res);
});

router.get("/genres/:name/release-date", function(req, res) {
  let sortBy = "first_release_date desc";
  let filter = "";
  let name = req.params.name;

  apiRequestGenreGames(sortBy, filter, name, res);
});

router.get("/genres/:name/rating", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = "";
  let name = req.params.name;

  apiRequestGenreGames(sortBy, filter, name, res);
});

router.get("/genres/:name/popularity", function(req, res) {
  let sortBy = "total_rating_count desc";
  let filter = "";
  let name = req.params.name;

  apiRequestGenreGames(sortBy, filter, name, res);
});

router.get("/genres/:name/name", function(req, res) {
  let sortBy = 'name asc';
  let filter = "";
  let name = req.params.name;

  apiRequestGenreGames(sortBy, filter, name, res);
});


module.exports = router;
