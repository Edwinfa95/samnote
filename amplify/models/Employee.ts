import { a } from '@aws-amplify/backend';

export const EmployeeModel = {
    Employee: a.model({
        name: a.string(),
        lastName: a.string(),
        phone: a.string(),
        cellphone: a.string(),
        barberShop: a.belongsTo('BarberShop','barber_shop_id'),
    }).authorization((allow) => [allow.publicApiKey()])
}