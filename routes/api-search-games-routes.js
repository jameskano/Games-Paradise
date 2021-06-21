// jshint esversion:9

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}));


// Search routes
// Function to request items from the api
function apiRequestSearch(name, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: 'fields name,cover.image_id,cover; limit 5; search "' + name + '"; where name != null & cover != null;'
  })
  .then(response => {
    console.log(response.data);

    res.render("autosearch", {
      results: response.data
    });
  })
  .catch(err => {
    console.error(err);
  });
}

router.get("/searchInput/:gameName", function(req, res) {
  let gameName = req.params.gameName;

  apiRequestSearch(gameName, res);
});

// Search games page
// Function to request items from the api
function apiRequestGames(name, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: 'fields total_rating,name,rating,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; limit 500; search "' + name + '"; where cover.image_id != null & first_release_date != null & genres != null & platforms != null & total_rating != null;'
  })
  .then(response => {
    console.log(response.data);
    res.render("index", {
      results: response.data,
      title: "SEARCH: " + name,
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

router.post("/search", function(req, res) {
  let gameName = req.body.gameName;

  apiRequestGames(gameName, res);
});


// Each game routes
// Function to request items from the api
function apiRequestGame(id, res) {
  axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Client-ID": "5py1g59uv8cdxn70ejawwm0vz6k7fk",
        "Authorization": "Bearer ycxnh3depzhn9wfz9he4dkggahig81",
      },
    data: "fields age_ratings,involved_companies,involved_companies.company.name,involved_companies.developer,involved_companies.publisher,similar_games,similar_games.name,similar_games.cover.image_id,summary,total_rating,total_rating_count,websites,websites.url,websites.category,name,rating,screenshots,screenshots.image_id,videos,videos.video_id,involved_companies,cover.image_id,cover,platforms,platforms.name,platforms.abbreviation,genres,genres.name,genres.slug,first_release_date; where id = " + id + ";"
  })
  .then(response => {
    console.log(response.data);

    res.render("game", {
      data: response.data,
      cssSrc: "css/styles.css",
      jsGameFunc: "js/games-functions.js",
      jsGamesOrderMenu: "js/games-order-menu.js",
      jsSrc: "js/index.js"
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

router.get("/:gameId", function(req, res) {
  let gameId = req.params.gameId;

  apiRequestGame(gameId, res);
});


module.exports = router;
