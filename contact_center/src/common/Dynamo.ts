const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    //get
    async get (phoneNumber: string, TableName: string) {
        const params = {
            TableName,
            Key: {
                phoneNumber
            }
        };
        const data = await documentClient
            .get(params)
            .promise()

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for phoneNumber of ${phoneNumber} from ${TableName}`)
        }        
        
        return data.Item;
    },
    //post
    async write(data, TableName) {
        if (!data.phoneNumber) {
            throw Error('no ID on the data')
        }
        const params = {
            TableName,
            Item: data
        };
        const res = await documentClient.put(params).promise();
        if (!res) {
            throw Error(`There was an error inserting ID of ${data.phoneNumber} in table ${TableName}`)
        }
        return data;
    },
    //put
    async update({tableName, primaryKey, primaryKeyValue, updateFirstName, updateLastName, updateAge}) {
        const params = {
            TableName: tableName,
            Key: { [primaryKey]: primaryKeyValue },
            UpdateExpression: `set firstName = :updateFirstName, lastName = :updateLastName, age = :updateAge`,
            ExpressionAttributeValues: {
                ':updateFirstName': updateFirstName,
                ':updateLastName': updateLastName,
                ':updateAge': updateAge,
            },
            ReturnValues:"UPDATED_NEW"
        }

        return documentClient.update(params).promise()
    },
    //delete
    async delete (phoneNumber: string, TableName: string) {
        const params = {
            TableName,
            Key: {
                phoneNumber
            }
        };      
        return documentClient.delete(params).promise()
    },    
}

module.exports = Dynamo;