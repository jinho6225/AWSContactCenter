import 'source-map-support/register';
import type { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";

const Responses = require("../../common/API_Responses");
const Dynamo = require("../../common/Dynamo");

const tableName: string = process.env.tableName;

const updateUser: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context, callback) => {
  console.log(event, 'event')

  if (!event["Details"].Parameters || !event["Details"].Parameters.phoneNumber) {
    return callback(null, Responses._400({ message: "missing the phoneNumber from the DB" }));
  }
  let phoneNumber: string = event["Details"].Parameters.phoneNumber;
  const { firstName, lastName, age } = event['Details'].Parameters
  console.log(phoneNumber, firstName, lastName, age, 'destructuring')
  //err handling needed
  const res = await Dynamo.update({
    tableName,
    primaryKey: 'phoneNumber',
    primaryKeyValue: phoneNumber,
    updateFirstName: firstName,
    updateLastName: lastName,
    updateAge: age
  })
  return callback(null, 'It\'s Updated')
}

export const main = middyfy(updateUser);
