// jshint esversion:9

const express = require("express");
const axios = require("axios");

const router = express.Router();


let today = (new Date().getTime() / 1000).toFixed(0);

// Recently released routes
// Function to request items from the api
let recentGamesTime = ((new Date().getTime() - 2592000000) / 1000).toFixed(0);

function apiRequestRecent(sortBy, recentGamesTime, filter, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: "fields total_rating,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 500; sort " + sortBy + "; where first_release_date > " + recentGamesTime + " & first_release_date <" + today + " & cover.image_id != null & first_release_date != null & genres != null & platforms.name != null & platforms!= null" + filter + ";"
  })
  .then(response => {
    console.log(response.data);
    res.render("index", {
      results: response.data,
      title: "RECENTLY RELEASED",
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

router.get("/recently-released", function(req, res) {
  let sortBy = "first_release_date desc";
  let filter = "";

  apiRequestRecent(sortBy, recentGamesTime, filter, res);
});

router.get("/recently-released/rating", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = " & total_rating != null";

  apiRequestRecent(sortBy, recentGamesTime, filter, res);
});

router.get("/recently-released/name", function(req, res) {
  let sortBy = "name asc";
  let filter = "";

  apiRequestRecent(sortBy, recentGamesTime, filter, res);
});

// Coming soon routes
// Function to request items from the api
function apiRequestComing(sortBy, filter, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: "fields total_rating,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 500; sort " + sortBy + "; where first_release_date >" + today + " & cover.image_id != null & first_release_date != null & genres != null & platforms.name != null & platforms != null" + filter + ";"
  })
  .then(response => {
    console.log(response.data);
    res.render("index", {
      results: response.data,
      title: "COMING SOON",
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

router.get("/coming-soon", function(req, res) {
  let sortBy = "first_release_date asc";
  let filter = "";

  apiRequestComing(sortBy, filter, res);
});

router.get("/coming-soon/rating", function(req, res) {
  let sortBy = "total_rating desc";
  let filter = " & total_rating != null";

  apiRequestComing(sortBy, filter, res);
});

router.get("/coming-soon/name", function(req, res) {
  let sortBy = "name asc";
  let filter = "";

  apiRequestComing(sortBy, filter, res);
});


module.exports = router;
