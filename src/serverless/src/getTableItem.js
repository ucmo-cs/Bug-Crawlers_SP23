'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"})
const documentClient = new AWS.DynamoDB.DocumentClient({apiVersion:'2012-08-10'});

// getTableItem Lambda Function
exports.handler = async event => {

  const { StatusID } = event.pathParameters;

  console.log("Received: "+ JSON.stringify(event, null, 2));
  let response = "";
  try {
    var params = {
      TableName: "StatusUpdates",
      Key: {'StatusID': Number(StatusID)}
    };
    
    // Print one element in table based on StatusID
    const result = await documentClient.get(params).promise();
    
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