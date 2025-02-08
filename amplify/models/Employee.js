export type Employee @model {
    id: ID!
    name: String!
    lastName: String!
    phone: String
    cellphone: String
    barberShopId: ID! @index
    barberShop: BarberShop @belongsTo
    sales: [Sale] @hasMany
}