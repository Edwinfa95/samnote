export type BasicData @model {
    id: ID!
    phoneNumber: String
    cellphoneNumber: String
    userId: ID! @index
    name: String!
    lastName: String!
    documentType: String
    documentNumber: String
    user: User @belongsTo
}