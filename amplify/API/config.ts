import { Resource, Stack } from "aws-cdk-lib";
import { AuthorizationType, Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export function configApi(backend: any) {

    // Crear un nuevo stack para la API
    const apiStack = backend.createStack("api-samnote");

    // Crear la API REST
    const samnoteRestApi = new RestApi(apiStack, "RestApi", {
        restApiName: "samnoteRestApi",
        deploy: true,
        deployOptions: {
            stageName: "dev",
        },
        defaultCorsPreflightOptions: {
            allowOrigins: Cors.ALL_ORIGINS,
            allowMethods: Cors.ALL_METHODS,
            allowHeaders: Cors.DEFAULT_HEADERS,
        },
    });

    const lambdas = [
        {
            path: 'invoice',
            lambda: backend.invocesApiFunction,
            policies: []
        },
        {
            path: 'shops',
            lambda: backend.shopsApiFunction,
            policies: [
                {
                    actions: [
                        "dynamodb:Scan",
                        "dynamodb:PutItem",
                        "dynamodb:UpdateItem",
                        "dynamodb:DeleteItem"
                    ],
                    resources: [
                        'arn:aws:dynamodb:us-east-2:619071329577:table/BarberShop-rswjb3xihzfgtgcdnh2l2kq5du-NONE'
                    ]
                }
            ]
        }
    ];

    lambdas.forEach((itemLambda) => {
        // Verificar si la Lambda está definida
        if (!itemLambda.lambda || !itemLambda.lambda.resources?.lambda) {
            throw new Error(`Lambda (${itemLambda.path}) no está definida. Asegúrate de haber creado una función Lambda.`);
        }

        // Integración con la Lambda
        const lambdaIntegration = new LambdaIntegration(
            itemLambda.lambda.resources.lambda
        );

        itemLambda.policies.forEach((policy:any) => {
            itemLambda.lambda.resources.lambda.addToRolePolicy(new PolicyStatement({
                actions: policy.actions,
                resources: policy.resources
            }))
        })

        // Crear recurso en la API sin autenticación
        const itemsPath = samnoteRestApi.root.addResource(itemLambda.path, {
            defaultMethodOptions: {
                authorizationType: AuthorizationType.NONE, // Permitir acceso sin autenticación
            },
        });

        // Métodos disponibles
        itemsPath.addMethod("GET", lambdaIntegration);
        itemsPath.addMethod("POST", lambdaIntegration);
        itemsPath.addMethod("DELETE", lambdaIntegration);
        itemsPath.addMethod("PUT", lambdaIntegration);

        // Agregar un proxy para manejar rutas dinámicas
        itemsPath.addProxy({
            anyMethod: true,
            defaultIntegration: lambdaIntegration,
        });
    });

    // Agregar información de salida
    backend.addOutput({
        custom: {
            API: {
                [samnoteRestApi.restApiName]: {
                    endpoint: samnoteRestApi.url,
                    region: Stack.of(samnoteRestApi).region,
                    apiName: samnoteRestApi.restApiName,
                },
            },
        },
    });

}
