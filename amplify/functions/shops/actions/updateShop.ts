import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

export const updateShop = async (event:any, docClient:any, TableName:string) => {
    try {
        const body = JSON.parse(event.body || "{}");
        const id = event.pathParameters?.proxy;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "El campo 'id' es obligatorio." }),
            };
        }

        // Verificar si la barbería existe antes de actualizar
        const getCommand = new GetItemCommand({
            TableName,
            Key: {
                id: { S: id },
            },
        });

        const existingItem = await docClient.send(getCommand);

        if (!existingItem.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Barbería no encontrada." }),
            };
        }

        // Crear la expresión de actualización dinámica
        let updateExpression = "SET ";
        let expressionAttributeValues: any = {};
        let expressionAttributeNames: any = {};

        let inputs = ['name','address', 'phone', 'email', 'updatedAt'];
        
        body['updatedAt'] = new Date().toISOString();

        for (const input of inputs) {
            if (body[input]) {
                updateExpression += `#${input} = :${input}, `;
                expressionAttributeValues[`:${input}`] = { S: body[input] };
                expressionAttributeNames[`#${input}`] = `${input}`;
            }
        }

        updateExpression = updateExpression.slice(0, -2); // Eliminar la última coma

        const updateCommand = new UpdateItemCommand({
            TableName,
            Key: {
                id: { S: id },
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: "ALL_NEW",
        });

        await docClient.send(updateCommand);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Barbería actualizada"
            }),
        };
    } catch (error) {
        console.log('Error: ',error)
        return { statusCode: 500, body: JSON.stringify({ error }) };
    }
}