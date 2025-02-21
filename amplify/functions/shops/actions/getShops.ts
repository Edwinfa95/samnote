import { GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

export const getShops = async (event: any, docClient: any, TableName: any) => {
    try {
        const id = event.pathParameters?.proxy;
        let command:any = new ScanCommand({
            TableName
        });
        if (id) {
            command = new GetItemCommand({
                TableName,
                Key: {
                    id: { S: id },
                },
            });
        }

        const response = await docClient.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify(id? response : response.Items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error }),
        };
    }
}