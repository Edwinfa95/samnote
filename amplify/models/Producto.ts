import { a } from '@aws-amplify/backend';

export const ProductoModel = {
    Producto: a.model({
        name: a.string(),
        description: a.string(),
        category: a.string()
    }).authorization((allow) => [allow.publicApiKey()])
}