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
        if (!data.ID) {
            throw Error('no ID on the data')
        }
        const params = {
            TableName,
            Item: data
        };
        const res = await documentClient.put(params).promise();
        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`)
        }
        return data;
    },
    // //put
    // async update({tableName, primaryKey, primaryKeyValue, updateKey, updateValue}) {
    //     const params = {
    //         TableName: tableName,
    //         Key: { [primaryKey]: primaryKeyValue },
    //         UpdateExpression: `set ${updateKey} = :updateValue`,
    //         ExpressionAttributeValues: {
    //             ':updateValue': updateValue,
    //         },
    //         ReturnValues:"UPDATED_NEW"
    //     }
    //     return documentClient.update(params).promise()
    // },
    // //delete
    // async delete (ID, TableName) {
    //     const params = {
    //         TableName,
    //         Key: {
    //             ID
    //         }
    //     };      
    //     return documentClient.delete(params).promise()
    // },    
}

module.exports = Dynamo;