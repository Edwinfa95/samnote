import { a } from '@aws-amplify/backend';

export const BarberShopModel = {
    BarberShop: a.model({
        name: a.string(),
        address: a.string(),
        phone: a.string(),
        email: a.string(),
        user_id: a.string(),
        employees: a.hasMany('Employee', 'barberShopId')
    }).authorization((allow) => [allow.publicApiKey()])
}