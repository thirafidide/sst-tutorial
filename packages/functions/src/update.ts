import { Table } from "sst/node/table";
import handler from "@sst-tutorial/core/handler";
import dynamoDb from "@sst-tutorial/core/dynamodb";

export const main = handler(async (event) => {
	const data = JSON.parse(event.body || "{}");

	await dynamoDb.update({
		TableName: Table.Notes.tableName,
		Key: {
			userId: "123",
			noteId: event?.pathParameters?.id,
		},
		UpdateExpression: "SET content = :content, attachment = :attachment",
		ExpressionAttributeValues: {
			":attachment": data.attachment || null,
			":content": data.content || null,
		},
		ReturnValues: "ALL_NEW",
	});

	return JSON.stringify({ status: true });
});
