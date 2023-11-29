const { sendResponse } = require("../../responses");
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

// DELETE /notes/{noteId}

exports.handler = async (event, context) => {
    const { noteId } = event.pathParameters;
    
    try {
        await db.delete({
            TableName: 'notesAPI',
            Key : { id: noteId }
        }).promise();

        return sendResponse(200, { success: true });
    } catch (error) {
        return sendResponse(500, { success: false, message : 'could not delete note'});
    }


}