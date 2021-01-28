import "source-map-support/register";
import { middyfy } from "@libs/lambda";
import fetch  from 'node-fetch';
import Responses from "../../common/API_Responses";

type Result = {
  statusCode: number
  metal: string
  currency: string
  prev_close_price: string
  high_price: string
  price: string
  low_price: string
}

const getGoldSilverPrice = async (event, _context, callback) => {
  console.log(event, 'event')

  if (!event["Details"].Parameters || !event["Details"].Parameters.type) {
    return callback(null, Responses._400({ message: "missing the cityName" }));
  }
  const type = event["Details"].Parameters.type
  let symbol = type === 'gold' ? 'XAU' : type === 'silver' ? 'XAG' : 'XAU'
  const url = `https://www.goldapi.io/api/${symbol}/USD`;
  const option = {
    method: 'GET',
    headers: {
      "x-access-token": `${process.env.API_KEY2}`,
      "Content-Type": "application/json"
    },
  }
  const data = await fetch(url, option)
  .then(response => response.json())
  .then(result => result)
  .catch(err => callback(null, Responses._400({ message: err})));

  console.log(data, 'data', typeof data['currency'], typeof data['price'])

  let result:Result = {
    statusCode: 200,
    metal: event["Details"].Parameters.type,
    currency: data['currency'],
    prev_close_price: String(data['prev_close_price'].toFixed(2)),
    high_price: String(data['high_price'].toFixed(2)),
    price: String(data['price'].toFixed(2)),
    low_price: String(data['low_price'].toFixed(2)),
  }

  return callback(null, result)
};

export const main = middyfy(getGoldSilverPrice);
