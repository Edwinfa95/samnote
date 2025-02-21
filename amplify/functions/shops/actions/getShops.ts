import { ScanCommand } from "@aws-sdk/client-dynamodb";

export const getShops = async (event:any, docClient:any, TableName:any) => {
    try {
        const id = event.pathParameters?.proxy;
        let query:any = { TableName };
        if(id){
            query.Key = {
                id: { S: id },
            }
        }

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