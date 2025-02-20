import { a } from '@aws-amplify/backend';

export const SalesInvoicesModel = {
    SalesInvoices: a.model({
        invoiceNumber: a.string(), // Número de factura
        date: a.datetime(), // Fecha de emisión
        customerId: a.id(), // ID del cliente
        customer: a.belongsTo('Customer', 'customerId'), // Relación con el cliente
        items: a.hasMany('InvoiceItem', 'invoiceId'), // Relación con los ítems de la factura
        subtotal: a.float(), // Subtotal antes de impuestos
        tax: a.float(), // Impuesto aplicado
        total: a.float(), // Total de la factura
        status: a.enum(['PENDING', 'PAID', 'CANCELLED']), // Estado de la factura
        paymentMethod: a.string(), // Método de pago (Ej. efectivo, tarjeta)
        notes: a.string(), // Notas adicionales
    }).authorization((allow) => [allow.publicApiKey()])
};
