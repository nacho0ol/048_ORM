const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
