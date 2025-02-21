import { ScanCommand } from "@aws-sdk/client-dynamodb";

export const getShops = async (docClient:any) => {
    try {
        const command = new ScanCommand({
            TableName: "BarberShops", // Nombre de la tabla en DynamoDB
          });
        
        const response = await docClient.send(command);
        
        return {
            statusCode: 200,
            body: JSON.stringify(response.Items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error }),
        };
    }
}