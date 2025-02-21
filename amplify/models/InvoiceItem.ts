import { a } from "@aws-amplify/backend";

export const InvoiceItemModel = {
    InvoiceItem: a.model({
        invoiceId: a.id(),
        invoice: a.belongsTo('SalesInvoice', 'invoiceId'),
        productId: a.id(),
        product: a.belongsTo('Product', 'productId'),
        quantity: a.integer(),
        price: a.float(),
        total: a.float()
    }).authorization((allow) => [allow.publicApiKey()])
};
