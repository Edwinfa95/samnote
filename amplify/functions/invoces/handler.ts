import { APIGatewayProxyHandler } from "aws-lambda";
import { docClient } from "../resources/dbConnection";

export const handler: APIGatewayProxyHandler = async (event) => {
    console.log("event", event);
    
    try {
        let response;
        switch (event.httpMethod) {
            case "GET":
                response = { statusCode: 400, body: JSON.stringify({ message: "Método GET permitido" }) };
            case "POST":
                response = { statusCode: 400, body: JSON.stringify({ message: "Método POST permitido" }) };
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