import dynamoDb from "@sst-tutorial/core/dynamodb";
import handler from "@sst-tutorial/core/handler";
import { Table } from "sst/node/table";

export const main = handler(async (event) => {
	await dynamoDb.delete({
		TableName: Table.Notes.tableName,
		Key: {
			userId: "123",
			noteId: event?.pathParameters?.id,
		},
	});

	return JSON.stringify({ status: true });
});
