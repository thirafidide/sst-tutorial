import { Table } from "sst/node/table";
import handler from "@sst-tutorial/core/handler";
import dynamoDb from "@sst-tutorial/core/dynamodb";

export const main = handler(async (event) => {
	const userId =
		event.requestContext.authorizer?.iam.cognitoIdentity.identityId;

	const params = {
		TableName: Table.Notes.tableName,
		KeyConditionExpression: "userId = :userId",
		ExpressionAttributeValues: {
			":userId": userId,
		},
	};

	const result = await dynamoDb.query(params);

	return JSON.stringify(result.Items);
});
