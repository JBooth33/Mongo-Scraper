var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//scraping tools
var cheerio = require("cheerio");

//require all models
var db = require("./models");

var PORT = 3000;

//initialize Express
var app = express();

//configure middleware

//use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
//use express.static to server the public folder as a static directory
app.use(express.static("public"));

//Connect to Mongo DB
mongoose.connect("mongodb://localhost/mongo_scraper");