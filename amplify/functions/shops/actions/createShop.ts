import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from 'crypto';

export const createShop = async (event:any, docClient:any, TableName:string) => {
    try {
        const body = JSON.parse(event.body || "{}");

        const id = randomUUID();
        const timestamp = new Date().toISOString(); // Fecha en formato ISO 8601

        const command = new PutItemCommand({
            TableName, // Nombre de la tabla
            Item: {
                id: { S: id },
                name: { S: body.name }, // Nombre de la barbería
                address:{ S: body.address },
                phone:{ S: body.phone },
                email:{ S: body.email },
                user_id:{ S: body.user_id },
                createdAt: { S: timestamp },
                updatedAt: { S: timestamp },
            },
        });

        await docClient.send(command);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Barbería creada", id }),
        };
    } catch (error) {
        console.log('Error',error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        };
    }
}