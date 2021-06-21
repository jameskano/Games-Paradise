// jshint esversion:9

const express = require("express");
const axios = require("axios");

const router = express.Router();


router.get("/contact", function(req, res) {
  res.render("contact");
});

router.post("/contact", function(req, res) {
  res.render("thanks-message");
});

router.get("/about", function(req, res) {
res.render("about");
});


module.exports = router;
