import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

export const updateShop = async (event:any, docClient:any, TableName:string) => {
    try {
        console.log('entro al metodo PUT')
        const body = JSON.parse(event.body || "{}");
        const id = event.pathParameters?.proxy;

        console.log('id:',id)

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

        console.log('Buscando...')
        const existingItem = await docClient.send(getCommand);

        console.log('Encuentra registro',existingItem)

        if (!existingItem.Item) {
            console.log('No encontro barberia')
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Barbería no encontrada." }),
            };
        }

        console.log('Creando SET')
        // Crear la expresión de actualización dinámica
        let updateExpression = "SET ";
        let expressionAttributeValues: any = {};
        let expressionAttributeNames: any = {};

        let inputs = ['name','address', 'phone', 'email'];

        try {
            for (const input of inputs) {
                console.log('input:',input,body[input])
                if (body[input]) {
                    updateExpression += `#${input} = :${input}, `;
                    expressionAttributeValues[`:${input}`] = { S: body[input] };
                    expressionAttributeNames[`#${input}`] = `${input}`;
                }
            }
        } catch (error) {
            console.log('Error al crear set:',error)
        }
        
        console.log('Set')

        updateExpression = updateExpression.slice(0, -2); // Eliminar la última coma

        const updateCommand = new UpdateItemCommand({
            TableName,
            Key: {
                id: { S: body.id },
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: "ALL_NEW",
        });

        const updatedItem = await docClient.send(updateCommand);

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