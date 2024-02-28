const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

const sleep = (millis) => {
  return new Promise((resolve) => setTimeout(resolve, millis));
};

let inputStream = Fs.createReadStream('binderOne.csv', 'utf8');
/**
 A row arrived:  [
  209,
  0.1,
  '',
  'en',
  "Vivien's Invocation",
  '5e2b30d2-81e9-40cd-86dd-3ec5dd06ced0',
  2,
  'rare',
  '784c4711-223d-4b95-a163-87e57f87b8db',
  'm19',
  'Core Set 2019'
]
 */
const columns = {
  collector_number: 0,
  estimated_price: 1,
  extras: 2,
  language: 3,
  name: 4,
  oracle_id: 5,
  quantity: 6,
  rarity: 7,
  scryfall_id: 8,
  set_code: 9,
  set_name: 10,
};

inputStream
  .pipe(
    new CsvReadableStream({
      parseNumbers: true,
      parseBooleans: true,
      trim: true,
    })
  )
  .on('data', async function (row) {
    const cardIsNotInDbYet =
      (await cardCollection.findOne({ _id: row[columns.scryfall_id] })) ===
      undefined;

    if (cardIsNotInDbYet) {
      // sleep to be a scyfall good citizen
      await sleep(100);

      console.log(`row is ${row}`);

      const res = await fetch(
        `https://api.scryfall.com/cards/${row[columns.scryfall_id]}`
      );
      const scryfallCardResponse = await res.json();

      console.log(
        `scryfallResponse is ${JSON.stringify(scryfallCardResponse)}`
      );

      const prices = {
        usd: parseFloat(scryfallCardResponse.prices.usd),
        usdFoil: parseFloat(scryfallCardResponse.prices.usdFoil),
        eur: parseFloat(scryfallCardResponse.prices.eur),
        eurFoil: parseFloat(scryfallCardResponse.prices.eur),
        tix: parseFloat(scryfallCardResponse.prices.tix),
      };

      scryfallCardResponse.prices = prices;
      scryfallCardResponse.historicalPrices.push(
        new HistoricalPrices(new Date(), prices)
      );

      // Use scryfallId as our unique object id instead of autogenerating one
      scryfallCardResponse._id = csvCard.scryfall_id;
      scryfallCardResponse.historicalPrices = [];
      cardCollection.insertOne(scryfallCardResponse);

      console.log(
        `\ncard is ${JSON.stringify(
          scryfallCardResponse.name
        )} and costs was inserted successfully`
      );
      cards.push(scryfallCardResponse);
    }
    console.log('A row arrived: ', row);
  })
  .on('end', function () {
    console.log('No more rows!');
  });
