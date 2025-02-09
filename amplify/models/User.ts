import { a } from '@aws-amplify/backend';

export const UserModel = {
    User: a.model({
        email: a.string(),
        password: a.string(),
        basicData: a.hasOne('BasicData', 'BasicDataId'),
        barberShops: a.hasMany('BarberShop', 'BarberShopId')
    }).authorization((allow) => [allow.publicApiKey()])
}