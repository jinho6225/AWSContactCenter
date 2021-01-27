import 'source-map-support/register';
import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";

const Responses = require("../../common/API_Responses");
const Dynamo = require("../../common/Dynamo");

const tableName: string = process.env.tableName;
interface bodyObj {
  phoneNumber: string,
  firstName: string,
  lastName: string,
  age: string
}

const createUser: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context, callback) => {
  console.log(event, 'event')

  let phoneNumber: string = event["Details"].Parameters.phoneNumber.substring(2);
  const reqBody:bodyObj = {
    phoneNumber: phoneNumber,
    firstName: event['Details'].Parameters.firstName,
    lastName: event['Details'].Parameters.lastName,
    age: event['Details'].Parameters.age
  }

  const newUser = await Dynamo.write(reqBody, tableName).catch(err => {
    return callback(null, Responses._400({ message: err })
  )})
  console.log(newUser, 'newUser')

  if (!newUser) {
      return callback(null, Responses._400({ message: "Failed to write user by phoneNumber" }));
  }

  newUser.statusCode = 201;
  return callback(null, newUser);
}

export const main = middyfy(createUser);
