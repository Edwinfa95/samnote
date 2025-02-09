import { a } from '@aws-amplify/backend';

export const ServiceModel = {
    Service: a.model({
        name: a.string(),
        description: a.string(),
        category: a.string(),
        barberShopId: a.id(),
        barberShop: a.belongsTo('BarberShop','barberShopId')
    }).authorization((allow) => [allow.publicApiKey()])
}