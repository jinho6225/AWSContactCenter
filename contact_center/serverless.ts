import type { AWS } from '@serverless/typescript';
import { hello, getUser, createUser } from './src/functions';

const tableName = 'userTable'

const serverlessConfiguration: AWS = {
  service: 'contact-center',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    tableName
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'serverlessUser',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      tableName
    },
    iamRoleStatements: [
      {
        "Effect": "Allow",
        "Action": [
          "dynamodb:*"
        ],
        "Resource": "*"
      }
    ],
    lambdaHashingVersion: '20201221',
  },
  functions: { 
    hello,
    getUser,
    createUser,
  },
  
  resources: {
    Resources: {
      MyDynamoDbTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: tableName,
          AttributeDefinitions: [
            {
              AttributeName: "phoneNumber",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "phoneNumber",
              KeyType: "HASH"
            }
          ],
          BillingMode: "PAY_PER_REQUEST"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
