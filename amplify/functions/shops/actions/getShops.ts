import { ScanCommand } from "@aws-sdk/client-dynamodb";

export const getShops = async (docClient:any) => {
    try {
        let TableName = process.env.AMPLIFY_DATA_BarberShops_TABLE_NAME;
        const command = new ScanCommand({
            TableName
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