import { a } from '@aws-amplify/backend';

export const ProductModel = {
    Product: a.model({
        name: a.string(),
        description: a.string(),
        category: a.string(),
        barberShopId: a.id(),
        barberShop: a.belongsTo('BarberShop','barberShopId'),
        invoiceItems: a.hasMany('InvoiceItem', 'productId')
    }).authorization((allow) => [allow.publicApiKey()])
}