import { a } from '@aws-amplify/backend';

export const ServiceModel = {
    Service: a.model({
        name: a.string(),
        description: a.string(),
        category: a.string(),
        price: a.float(),
        barberShop: a.belongsTo('BarberShop','BarberShopId'),
    }).authorization((allow) => [allow.publicApiKey()])
}