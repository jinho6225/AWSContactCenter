import "source-map-support/register";
import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import fetch  from 'node-fetch';

const Responses = require("../../common/API_Responses");

const getWeather: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context, callback) => {
  console.log(event, 'event')
  if (!event["Details"].Parameters || !event["Details"].Parameters.location) {
    return callback(null, Responses._400({ message: "missing the cityName" }));
  }
  const location = event["Details"].Parameters.location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`;

  const data = await fetch(url)
  .then(res => res.json())
  .then(data => data)
  .catch(err => callback(null, Responses._400({ message: err })));
  
  return callback(null, {
    statusCode: 200,
    name: data.name,
    weather: data.weather[0].main,
    weatherDesc: data.weather[0].description,
    temp: Math.round((data.main.temp - 273.15) * (9/5) + 32),
    minTemp: Math.round((data.main.temp_min - 273.15) * (9/5) + 32),
    maxTemp: Math.round((data.main.temp_max - 273.15) * (9/5) + 32),
  })
};

export const main = middyfy(getWeather);
