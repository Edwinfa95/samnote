import { a } from '@aws-amplify/backend';

export const BarberShopModel = {
    BarberShop: a.model({
        barber_shop_id: a.id(),
        name: a.string(),
        address: a.string(),
        phone: a.string(),
        email: a.string(),
        user_id: a.string()
    }).authorization((allow) => [allow.publicApiKey()])
}