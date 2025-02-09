import { a } from '@aws-amplify/backend';

export const BarberShopModel = {
    BarberShop: a.model({
        name: a.string(),
        address: a.string(),
        user: a.belongsTo('User','UserId'),
        employees: a.hasMany('Employee','EmployeeId'),
        services: a.hasMany('Service','ServiceId'),
    }).authorization((allow) => [allow.publicApiKey()])
}