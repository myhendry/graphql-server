const { gql } = require("apollo-server-express");

const bookTypeDefs = require("./book");
const brainTypeDefs = require("./brain");
const taskTypeDefs = require("./task");
const userTypeDefs = require("./user");
const scraperTypeDefs = require("./scraper");

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;

module.exports = [
  typeDefs,
  bookTypeDefs,
  brainTypeDefs,
  taskTypeDefs,
  userTypeDefs,
  scraperTypeDefs
];
