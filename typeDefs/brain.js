const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getSentiment: Boolean
    testPyHelloService: String
    testPyMicroService(statement: String!): String
  }
`;
