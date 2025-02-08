export type BarberShop @model {
    id: ID!
    name: String!
    address: String!
    userId: ID! @index
    user: User @belongsTo
    employees: [Employee] @hasMany
    services: [Service] @hasMany
    products: [Product] @hasMany
}