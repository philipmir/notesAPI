
const AWS = require('aws-sdk');
const { sendResponse } = require('../../responses');
const db = new AWS.DynamoDB.DocumentClient();



exports.handler = async (event, context) => {
    const note = JSON.parse(event.body);

    const timestamp = new Date().getTime();

    note.id = `${timestamp}`;

    try {
        await db.put({
            TableName: 'notesAPI',
            Item: note
        }).promise();

        return sendResponse(200, {success: true});
    } catch (error) {
        
        return sendResponse(500, {success: false});
    }
}