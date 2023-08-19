const express = require("express");
const router = express.Router();

const scryfallCardsService = require("../scryfallcard-service");

router.get("/scryfallCards", (req, res) => {
  scryfallCardsService.get(req, res);
});

router.put("/scryfallcard", (req, res) => {
  scryfallCardsService.create(req, res);
});

router.post("/scryfallcard", (req, res) => {
  scryfallCardsService.update(req, res);
});

router.delete("/scryfallcard/:id", (req, res) => {
  scryfallCardsService.destroy(req, res);
});

module.exports = router;
