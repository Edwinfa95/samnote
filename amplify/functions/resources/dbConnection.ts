import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

export const createConnection = () => {
    
    const client = new DynamoDBClient({});
    return DynamoDBDocumentClient.from(client);
}