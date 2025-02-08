export type Service @model {
    id: ID!
    name: String!
    description: String!
    category: String!
    price: Float!
    barberShopId: ID! @index
    barberShop: BarberShop @belongsTo
}