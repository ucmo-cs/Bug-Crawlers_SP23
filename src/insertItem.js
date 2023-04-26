'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"})
const documentClient = new AWS.DynamoDB.DocumentClient({apiVersion:'2012-08-10'});

// insertItem Lambda Function
exports.handler = async event => {

  const { StatusID } = event.pathParameters;
  const { Username, FEMA, FLP, Description, DateTime } = event.queryStringParameters;
  // const DateTime = String(new Date().toISOString().slice(0,10));
  const Submitted = true;

  console.log("Received: "+ JSON.stringify(event, null, 2));
  let response = "";
  try {
    var params = {
      TableName: "StatusUpdates",
      Item: {
        'StatusID': Number(StatusID),
        'Date': DateTime,
        'Description': Description,
        'FEMA': FEMA,
        'FLP': FLP,
        'Submitted': Submitted,
        'Username': Username
      }
    };
    
    // Insert new item into table
    await documentClient.put(params).promise();
    
    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: "Item has successfully been added/updated",
      // TableName: "StatusUpdates",
      // StatusID: Number(StatusID),
      // Username: Username,
      // DateTime: DateTime,
      // Description: Description,
      // FEMA: FEMA,
      // FLP: FLP,
      // Submitted: Submitted
    };
  }
  catch(exception) {
    console.error(exception);
    response = {
      statusCode: 500,
      body: JSON.stringify({"Message: " : exception})
    };
  }
  return response;
}