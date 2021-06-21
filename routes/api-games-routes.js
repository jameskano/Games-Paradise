// jshint esversion:9

const express = require("express");
const axios = require("axios");

const router = express.Router();


let today = (new Date().getTime() / 1000).toFixed(0);

// Home routes
// Function to request items from the api
let newGames = ((new Date().getTime() - 7776000000) / 1000).toFixed(0);

function apiRequestHome(sortBy, newGames, filter, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: "fields total_rating,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 500; sort " + sortBy + "; where first_release_date > " + newGames + " & first_release_date <" + today + "& cover.image_id != null & first_release_date != null & genres != null" + filter + " & total_rating > 50 & platforms != null & platforms.name != null & total_rating != null;"
  })
  .then(response => {
    console.log(response.data);
    res.render("index", {
      results: response.data,
      title: "NEW AND POPULAR",
      cssSrc: "css/styles.css",
      cssResponsive: "css/styles-responsive.css",
      jsGameFunc: "js/games-functions.js",
      jsGamesOrderMenu: "js/games-order-menu.js",
      jsSrc: "js/index.js",
      jsSidebar: "js/sidebar-scroll.js",
      jsAutoSearch: "js/autocomplete.js"
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

router.get("/", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = "& total_rating_count > 4";

  apiRequestHome(sortBy, newGames, filter, res);
});

router.get("/release-date", function(req, res) {
  let sortBy = "first_release_date desc";
  let filter =  "& total_rating_count > 2";

  apiRequestHome(sortBy, newGames, filter, res);
});

router.get("/rating", function(req, res) {
  let sortBy = "total_rating desc";
  let filter =  "& total_rating_count > 2";

  apiRequestHome(sortBy, newGames, filter, res);
});

router.get("/popularity", function(req, res) {
  let sortBy = "total_rating_count desc";
  let filter =  "& total_rating_count > 2";

  apiRequestHome(sortBy, newGames, filter, res);
});

router.get("/name", function(req, res) {
  let sortBy = "name asc";
  let filter =  "& total_rating_count > 2";

  apiRequestHome(sortBy, newGames, filter, res);
});

// All games routes
// Function to request items from the api
function apiRequestGames(sortBy, filter, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: "fields total_rating,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 500; sort " + sortBy + "; where cover.image_id != null & first_release_date <=" + today + " & first_release_date != null & genres != null & platforms != null & platforms.name != null & total_rating != null" + filter + ";"
  })
  .then(response => {
    console.log(response.data);
    res.render("index", {
      results: response.data,
      title: "ALL GAMES",
      cssSrc: "css/styles.css",
      cssResponsive: "css/styles-responsive.css",
      jsGameFunc: "js/games-functions.js",
      jsGamesOrderMenu: "js/games-order-menu.js",
      jsSrc: "js/index.js",
      jsSidebar: "js/sidebar-scroll.js",
      jsAutoSearch: "js/autocomplete.js"
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

router.get("/games", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = " & total_rating_count > 10";

  apiRequestGames(sortBy, filter, res);
});

router.get("/games/release-date", function(req, res) {
  let sortBy = "first_release_date desc";
  let filter = "";

  apiRequestGames(sortBy, filter, res);
});

router.get("/games/rating", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = "";

  apiRequestGames(sortBy, filter, res);
});

router.get("/games/popularity", function(req, res) {
  let sortBy = "total_rating_count desc";
  let filter = "";

  apiRequestGames(sortBy, filter, res);
});

router.get("/games/name", function(req, res) {
  let sortBy = "name asc";
  let filter = "";

  apiRequestGames(sortBy, filter, res);
});


module.exports = router;
