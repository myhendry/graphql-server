const { gql } = require("apollo-server-express");

const bookTypeDefs = require("./book");
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

module.exports = [typeDefs, bookTypeDefs, userTypeDefs, scraperTypeDefs];
