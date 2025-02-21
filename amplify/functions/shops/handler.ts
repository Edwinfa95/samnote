import { APIGatewayProxyHandler } from "aws-lambda";
import { createConnection } from "../resources/dbConnection";
import { getShops } from "./actions/getShops";

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log("event-shops", event);
    
    try {
        let response;
        switch (event.httpMethod) {
            case "GET":
                try {
                    const docClient = createConnection();
                    response = await getShops(docClient);
                } catch (error) {
                    response = { statusCode: 500, body: JSON.stringify({ error }) };
                }
                break;
            case "POST":
                response = { statusCode: 400, body: JSON.stringify({ message: "Método POST permitido" }) };
                break;
            case "PUT":
                console.log('entra PUT');
                response = { statusCode: 400, body: JSON.stringify({ message: "Método PUT permitido" }) };
                break;
            case "DELETE":
                console.log('entra DELETE');
                response = { statusCode: 400, body: JSON.stringify({ message: "Método DELETE permitido" }) };
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