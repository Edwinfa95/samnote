import { a } from '@aws-amplify/backend';

export const EmployeeModel = {
    Employee: a.model({
        name: a.string(),
        lastName: a.string(),
        phone: a.string(),
        cellphone: a.string(),
        barberShop: a.belongsTo('BarberShop','BarberShopId'),
    }).authorization((allow) => [allow.publicApiKey()])
}