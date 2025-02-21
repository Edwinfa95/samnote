import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";

export const deleteShop = async (event:any, docClient:any, TableName:string) => {
    try {
        const id = event.pathParameters?.proxy; // Obtener el ID desde la URL

        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ message: "ID requerido" }) };
        }

        const command = new DeleteItemCommand({
            TableName,
            Key: {
                id: { S: id },
            },
        });
        
        await docClient.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Barbería eliminada" }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error }) };
    }
}