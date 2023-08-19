const ScryfallCard = require("./scryfallCard-model");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongo").connect();

function get(req, res) {
  const docquery = ScryfallCard.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then((scryfallCards) => {
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
  const { id } = req.params;

  ScryfallCard.findOneAndRemove({ id })
    .then((scryfallCard) => {
      res.json(scryfallCard);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

module.exports = { get, create, update, destroy };
