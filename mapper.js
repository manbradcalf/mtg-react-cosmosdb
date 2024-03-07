import * as Fs from 'fs';
import CsvReadableStream from 'csv-reader';
import { sleep } from './util.js';

let inputStream = Fs.createReadStream('binderOne.csv', 'utf8');

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

let scryfallIds = [];
let entities = [];

inputStream
  .pipe(
    new CsvReadableStream({
      parseNumbers: true,
      parseBooleans: true,
      trim: true,
    })
  )
  .on('data', async function (row) {
    scryfallIds.push(row[columns.scryfall_id]);
  })
  .on('end', async function () {
    console.log('No more rows!');
    for (let i = 0; i < scryfallIds.length; i++) {
      let entity = await mapScryfallResponseToEntity(scryfallIds[i]);
      entities.push(entity);
      console.log(`Just pushed ${entity.name}`);
    }
  });

const mapScryfallResponseToEntity = async (scryfallId) => {
  const url = `https://api.scryfall.com/cards/${scryfallId}`;
  // sleep to be a scyfall good citizen
  await sleep(2000);
  const res = await fetch(url);
  const cardEntity = res.json();

  if (!cardEntity) {
    console.log(`${row}\n\n can't be mapped.`);
  }

  // parse to float so we cqn store these as numbers in mongo
  const prices = {
    usd: parseFloat(cardEntity.prices?.usd ?? -1),
    usdFoil: parseFloat(cardEntity.prices?.usdFoil ?? -1),
    eur: parseFloat(cardEntity.prices?.eur ?? -1),
    eurFoil: parseFloat(cardEntity.prices?.eur ?? -1),
    tix: parseFloat(cardEntity.prices?.tix ?? -1),
  };

  cardEntity.prices = prices;

  // Use scryfallId as our unique object id instead of autogenerating one
  cardEntity._id = scryfallId;
  // generate historicalPrices array so we can log price history moving forward
  cardEntity.historicalPrices = [];
  cardEntity.historicalPrices.push({
    date: new Date(),
    prices: prices,
  });

  return cardEntity;
};
