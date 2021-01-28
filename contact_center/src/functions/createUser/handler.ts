import 'source-map-support/register';
import { middyfy } from "@libs/lambda";
import Responses from "../../common/API_Responses";
import Dynamo from "../../common/Dynamo";

const tableName: string = process.env.tableName;

type Body = {
  phoneNumber: string,
  firstName: string,
  lastName: string,
  age: string
}

const createUser = async (event, _context, callback) => {
  console.log(event, 'event')
  let phoneNumber: string = event["Details"].Parameters.phoneNumber.substring(2);
  const reqBody:Body = {
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
