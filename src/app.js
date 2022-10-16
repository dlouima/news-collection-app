require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
let ejs = require("ejs");
var partials = require("express-partials");

const key = process.env.KEY;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(partials());
const port = process.env.PORT || 3000;
app.use(express.static("public"));

app.get("/", async function (req, res) {
  if (req.body.serachInput) {
    keyword = req.body.serachInput;
    console.log(keyword);
    url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${key}`;
    let data;
    try {
      data = await axios.get(url);
    } catch (err) {
      console.log(err);
    }

    res.render("result", { PostData: data.data.articles });
  } else {
    res.render("index");
  }
});

app.post("/", async function (req, res) {
  if (req.body.serachInput) {
    keyword = req.body.serachInput;
    console.log(keyword);
    url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${key}`;
    let data;
    try {
      data = await axios.get(url);
    } catch (err) {
      console.log(err);
    }

    res.render("result", { PostData: data.data.articles });
  } else {
    res.render("index");
  }
});

app.get("/contact", async function (req, res) {
  res.render("contact");
});

app.get("/newsLetter", async function (req, res) {
  res.render("newsLetter");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
