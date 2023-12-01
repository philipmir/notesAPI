const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const middy = require('middy'); // Make sure to install 'middy' if you haven't already
const { validateToken } = require('../middleware/auth');
const db = new AWS.DynamoDB.DocumentClient();

const getNotes = async (event, context) => {
    try {
        if (event?.error && event?.error === '401') {
            return sendResponse(401, { success: false, message: 'Invalid token' });
        }

        const { Items } = await db.scan({
            TableName: 'notesAPI',
            FilterExpression: "attribute_exists (#id)",
            ExpressionAttributeNames: {
                "#id": "id"
            }
        }).promise();

        return sendResponse(200, { success: true, notes: Items });
    } catch (error) {
        console.error(error);
        return sendResponse(500, { success: false, message: 'Internal Server Error' });
    }
};

const handler = middy(getNotes)
    .use(validateToken);

module.exports = { handler };
