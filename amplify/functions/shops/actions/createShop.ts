import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export const createShop = async (event:any, docClient:any, TableName:string) => {
    try {
        console.log('entro al metodo POST')
        const body = JSON.parse(event.body || "{}");
        console.log('body:',body);

        const id = crypto.randomUUID();

        console.log('data',{
            id: { S: id },
            name: { S: body.name }, // Nombre de la barbería
            address:{ S: body.address },
            phone:{ S: body.phone },
            email:{ S: body.email },
            user_id:{ S: body.user_id }
        })

        const command = new PutItemCommand({
            TableName, // Nombre de la tabla
            Item: {
                id: { S: id },
                name: { S: body.name }, // Nombre de la barbería
                address:{ S: body.address },
                phone:{ S: body.phone },
                email:{ S: body.email },
                user_id:{ S: body.user_id }
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