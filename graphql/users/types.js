const {gql} = require('apollo-server-express');

const typeDefs = gql`


    type publicUserObject {
        name: String!
        email: String!
        isSeller: Boolean!
        isAdmin: Boolean!
        isPrimeMember: Boolean!
        id: String!   
    }
    
    type Query {
        user(ID: ID!): publicUserObject!
        getUsers(amount: Int): [publicUserObject]!
    }
`

module.exports = typeDefs;