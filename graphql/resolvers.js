const {merge} = require('lodash')

const productResolver = require('./products/resolvers');
const userResolver = require('./users/resolver');
const authResolver = require('./auth/resolver');


const resolvers = merge(
    productResolver,
    userResolver
)

const authResolvers = merge(
    authResolver
)

module.exports = {resolvers, authResolvers};