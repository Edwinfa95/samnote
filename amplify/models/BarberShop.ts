import { a } from '@aws-amplify/backend';

export const BarberShopModel = {
    BasicData: a.model({
        name: a.string(),
        address: a.string(),
        user_id: a.id(),
        employees: a.hasMany('Employee','EmployeeId'),
        services: a.hasMany('Service','ServiceId')
    }).authorization((allow) => [allow.publicApiKey()])
}