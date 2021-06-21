// jshint esversion:9

const express = require("express");
const axios = require("axios");

const router = express.Router();


let today = (new Date().getTime() / 1000).toFixed(0);

// Top all time routes
// Function to request items from the api
function apiRequestTop(sortBy, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: "fields total_rating,total_rating_count,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 250; sort " + sortBy + "; where total_rating_count > 500 & total_rating >= 80 & cover.image_id != null & first_release_date != null & genres != null & platforms != null & platforms.name != null & total_rating != null;"
  })
  .then(response => {
    console.log(response.data);
    res.render("index", {
      results: response.data,
      title: "TOP ALL TIME",
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

router.get("/top", function(req, res) {
  let sortBy = "total_rating desc";

  apiRequestTop(sortBy, res);
});

router.get("/top/release-date", function(req, res) {
  let sortBy = "first_release_date desc";

  apiRequestTop(sortBy, res);
});

router.get("/top/popularity", function(req, res) {
  let sortBy = "total_rating_count desc";

  apiRequestTop(sortBy, res);
});

router.get("/top/name", function(req, res) {
  let sortBy = "name asc";

  apiRequestTop(sortBy, res);
});

// Best of year routes
// Function to request items from the api
let yearGames = ((new Date().getTime() - 31556926000) / 1000).toFixed(0);

function apiRequestBest(sortBy, yearGames, today, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: "fields total_rating,total_rating_count,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 500; sort " + sortBy + "; where first_release_date >" + yearGames + " & first_release_date <" + today + " & total_rating_count > 12 & total_rating > 50 & cover.image_id != null & first_release_date != null & genres != null & platforms != null & platforms.name != null & total_rating != null;"
  })
  .then(response => {
    console.log(response.data);
    res.render("index", {
      results: response.data,
      title: "BEST OF THE YEAR",
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

router.get("/best", function(req, res) {
  let sortBy = "total_rating desc";

  apiRequestBest(sortBy, yearGames, today, res);
});

router.get("/best/release-date", function(req, res) {
  let sortBy = "first_release_date desc";

  apiRequestBest(sortBy, yearGames, today, res);
});

router.get("/best/popularity", function(req, res) {
  let sortBy = "total_rating_count desc";

  apiRequestBest(sortBy, yearGames, today, res);
});

router.get("/best/name", function(req, res) {
  let sortBy = "name asc";

  apiRequestBest(sortBy, yearGames, today, res);
});


module.exports = router;
