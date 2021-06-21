// jshint esversion:9

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}));


let today = (new Date().getTime() / 1000).toFixed(0);

// Platforms page routes
// Function to request items from the api
function apiRequestPlatforms(res) {
  axios({
    url: "https://api.igdb.com/v4/platforms",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: "fields abbreviation,name,platform_logo,platform_logo.image_id; limit 500; where platform_logo != null & platform_logo.image_id != null;"
  })
  .then(response => {
    console.log(response.data);
    res.render("platforms", {
      results: response.data,
      title: "PLATFORMS"
    });
  })
  .catch(err => {
    console.error(err);
    res.render("404", {
      jsContactAbout: "js/contact-about.js",
      cssStyles: "css/styles.css",
      cssContactAbout404Responsive: "css/contact-about-404-responsive.css",
      cssContactAbout404: "css/contact-about-404.css"
    });
  });
}

router.get("/platforms", function(req, res) {
  apiRequestPlatforms(res);
});

// Platform games routes
// Function to request items from the api
function apiRequestPlatformGames(sortBy, filter, name, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: 'fields total_rating,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 500; sort ' + sortBy + '; where platforms.abbreviation = "' + name + '" & cover.image_id != null & first_release_date <=' + today + ' & first_release_date != null & genres != null & platforms != null & platforms.name != null & total_rating != null' + filter + ';'
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

router.get("/platforms/:abbr", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = " & total_rating_count > 10";
  let abbr = req.params.abbr;

  apiRequestPlatformGames(sortBy, filter, abbr, res);
});

router.get("/platforms/:abbr/release-date", function(req, res) {
  let sortBy = "first_release_date desc";
  let filter = "";
  let abbr = req.params.abbr;

  apiRequestPlatformGames(sortBy, filter, abbr, res);
});

router.get("/platforms/:abbr/rating", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = "";
  let abbr = req.params.abbr;

  apiRequestPlatformGames(sortBy, filter, abbr, res);
});

router.get("/platforms/:abbr/popularity", function(req, res) {
  let sortBy = "total_rating_count desc";
  let filter = "";
  let abbr = req.params.abbr;

  apiRequestPlatformGames(sortBy, filter, abbr, res);
});

router.get("/platforms/:abbr/name", function(req, res) {
  let sortBy = "name asc";
  let filter = "";
  let abbr = req.params.abbr;

  apiRequestPlatformGames(sortBy, filter, abbr, res);
});


module.exports = router;
