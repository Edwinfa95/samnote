import { a } from '@aws-amplify/backend';

export const CustomerModel = {
    Customer: a.model({
        name: a.string(),
        lastName: a.string(),
        phone: a.string(),
        cellphone: a.string(),
        barberShopId: a.id(),
        barberShop: a.belongsTo('BarberShop','barberShopId'),
        SalesInvoice: a.hasMany('SalesInvoice','customerId')
    }).authorization((allow) => [allow.publicApiKey()])
}