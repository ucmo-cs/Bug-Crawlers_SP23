'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"})
const documentClient = new AWS.DynamoDB.DocumentClient({apiVersion:'2012-08-10'});

// getTable Lambda Function
exports.handler = async event => {
  console.log("Received: "+ JSON.stringify(event, null, 2));
  let response = "";
  try {var params = {
    TableName: "StatusUpdates"
  };
    // Print all items in table
    const result = await documentClient.scan(params).promise();
    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result),
    };
  }
  catch(exception) {
    console.error(exception);
    response = {
      statusCode: 500,
      body: JSON.stringify({"Message: " : exception}),
    };
  }
  return response;
}