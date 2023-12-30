const {gql} = require('apollo-server-express');

const typeDefs = gql`

    type Product {
        name: String!
        description: String!
        price: Int!
        id: String!
    }

    input ProductInput {
        name: String!
        description: String!
        price: Int!
    }

    input EditProductInput {
        name: String
        description: String
        price: Int
    }

    type Query {
        product(ID: ID!): Product!
        getProducts(amount: Int): [Product]
    }

    type Mutation {
        createProduct(input: ProductInput): Product!
        deleteProduct(ID: ID!): Product!
        updateProduct(ID: ID!, input: EditProductInput): Product!
    }
`

module.exports = typeDefs;