const productTypeDefs = require("./products/types");
const userTypeDefs = require("./users/types");
const authTypeDef = require("./auth/types");

const typeDefs = [productTypeDefs, userTypeDefs];

const authTypeDefs = [authTypeDef];

module.exports = { typeDefs, authTypeDefs };
