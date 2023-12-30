const {gql} = require('apollo-server-express');

const typeDefs = gql`
    
    type User {
        name: String!
        email: String!
        password: String
        isSeller: Boolean!
        isAdmin: Boolean!
        isPrimeMember: Boolean!
        emailVerified: Boolean
        id: String!
        refreshToken: String
    }

    type Token {
        accessToken: String!
        refreshToken: String
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
        isSeller: Boolean!
        isAdmin: Boolean!
        isPrimeMember: Boolean!
        emailVerified: Boolean!
    }

    input updateUserNameInput {
        name: String
    }

    input updateUserEmailInput {
        email: String!
    }

    input updateUserPasswordInput {
        password: String!
    }

    input updateUserIsSellerInput {
        isSeller: Boolean!
    }

    input updateUserIsAdminInput {
        isAdmin: Boolean!
    }

    input updateUserIsPrimeMemberInput {
        isPrimeMember: Boolean!
    }

    input updateUserEmailVerifiedInput {
        emailVerified: Boolean!
    }

    type Query {
        getAccount: User!
    }

    type Mutation {
        createUser(input: UserInput): User!
        deleteUser: User!
        updateUserName(ID: ID!, input: updateUserNameInput): User!
        updateUserEmail(ID: ID!, input: updateUserEmailInput): User!
        updateUserPassword(ID: ID!, input: updateUserPasswordInput): User!
        updateUserIsSeller(ID: ID!, input: updateUserIsSellerInput): User!
        updateUserIsAdmin(ID: ID!, input: updateUserIsAdminInput): User!
        updateUserIsPrimeMember(ID: ID!, input: updateUserIsPrimeMemberInput): User!
        updateUserEmailVerified(ID: ID!, input: updateUserEmailVerifiedInput): User!
        loginUser(email: String!, password: String!): Token!
        refreshToken: Token!
        logoutUser: Boolean!
    }
`

module.exports = typeDefs;