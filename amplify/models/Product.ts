import { a } from '@aws-amplify/backend';

export const ProductModel = {
    Product: a.model({
        name: a.string(),
        description: a.string(),
        category: a.string(),
        barberShop: a.belongsTo('BarberShop','barber_shop_id')
    }).authorization((allow) => [allow.publicApiKey()])
}