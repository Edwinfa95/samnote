import { APIGatewayProxyHandler } from "aws-lambda";
import { createConnection } from "../resources/dbConnection";
import { getShops } from "./actions/getShops";
import { createShop } from "./actions/createShop";
import { deleteShop } from "./actions/deleteShop";
import { updateShop } from "./actions/updateShop";

const TableName = 'BarberShop-rswjb3xihzfgtgcdnh2l2kq5du-NONE';

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log("event-shops", event);
    
    try {
        let response;
        const docClient = createConnection();
        switch (event.httpMethod) {
            case "GET":
                try {
                    response = await getShops(event,docClient, TableName);
                } catch (error) {
                    response = { statusCode: 500, body: JSON.stringify({ error }) };
                }
                break;
            case "POST":
                try {
                    response = await createShop(event, docClient, TableName)
                } catch (error) {
                    response = { statusCode: 500, body: JSON.stringify({ error }) };
                }
                break;
            case "PUT":
                try {
                    response = await updateShop(event, docClient, TableName)
                } catch (error) {
                    response = { statusCode: 500, body: JSON.stringify({ error }) };
                }
                break;
            case "DELETE":
                try {
                    response = await deleteShop(event, docClient, TableName)
                } catch (error) {
                    response = { statusCode: 500, body: JSON.stringify({ error }) };
                }
                break;
            default:
                console.log('entra sin metodo');
                response = { statusCode: 400, body: JSON.stringify({ message: "Método no permitido" }) };
                break;
        }

        return {
            ...response,
            headers: {
                "Access-Control-Allow-Origin": "*", // Permitir todas las solicitudes
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            }
        };
    } catch (error) {
        console.error("Error en Lambda:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({ message: "Error en el servidor", error }),
        };
    }
};