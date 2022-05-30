const express = require("express");
const req = require("express/lib/request");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is user");
});

router.get("/new", (req, res) => {
  res.send("new user form");
});

router.post("/", (req, res) => {
  res.send("create new user");
});

router.get("/:id", (req, res) => {
  res.send(`user id ${req.params.id}`);
});

router.param

module.exports = router;
