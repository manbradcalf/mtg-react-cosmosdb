const ScryfallCard = require("./scryfallCard-model");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongo").connect();

function get(req, res) {
  // build query
  const queryBody = {};

  if (req.query.minPrice) {
    queryBody["prices.usd"] = { $gt: parseFloat(req.query.minPrice) };
  }

  if (req.query.typeLine) {
    queryBody.type_line = { $regex: req.query.typeLine, $options: "i" };
  }

  if (req.query.cardName) {
    queryBody.name = {
      $regex: req.query.cardName,
      $options: "i",
    };
  }
  if (req.query.oracleText) {
    queryBody.oracle_text = {
      $regex: req.query.oracleText,
      $options: "i",
    };
  }

  const colorIdentity = [];
  if (req.query.w === "on") {
    colorIdentity.push("W");
  }
  if (req.query.u === "on") {
    colorIdentity.push("U");
  }
  if (req.query.b === "on") {
    colorIdentity.push("B");
  }
  if (req.query.r === "on") {
    colorIdentity.push("R");
  }
  if (req.query.g === "on") {
    colorIdentity.push("G");
  }
  if (colorIdentity.length !== 0) {
    queryBody.color_identity = {
      $all: colorIdentity,
    };
  }
  if (req.query.minCmc) {
    queryBody.cmc = {
      $gte: parseInt(req.query.minCmc),
    };
  }
  if (req.query.maxCmc) {
    queryBody.cmc = {
      $lte: parseInt(req.query.maxCmc),
    };
  }


  console.log(queryBody);

  const docquery = ScryfallCard.find(queryBody).limit(10).read(ReadPreference.NEAREST);

  docquery
    .exec()
    .then((scryfallCards) => {
      console.log(scryfallCards)
      res.json(scryfallCards);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function create(req, res) {
  const scryfallCard = new ScryfallCard(req.body);
  scryfallCard
    .save()
    .then(() => {
      res.json(scryfallCard);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function update(req, res) {
  const { id, name, saying } = req.body;

  ScryfallCard.findOne({ id })
    .then((scryfallCard) => {
      scryfallCard.name = name;
      scryfallCard.saying = saying;
      scryfallCard.save().then(res.json(scryfallCard));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  const { id } = req.query;

  ScryfallCard.findOneAndRemove({ id })
    .then((scryfallCard) => {
      res.json(scryfallCard);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = { get, create, update, destroy };
