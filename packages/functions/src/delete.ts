import dynamoDb from "@sst-tutorial/core/dynamodb";
import handler from "@sst-tutorial/core/handler";
import { Table } from "sst/node/table";

export const main = handler(async (event) => {
	const userId =
		event.requestContext.authorizer?.iam.cognitoIdentity.identityId;

	await dynamoDb.delete({
		TableName: Table.Notes.tableName,
		Key: {
			userId,
			noteId: event?.pathParameters?.id,
		},
	});

	return JSON.stringify({ status: true });
});
