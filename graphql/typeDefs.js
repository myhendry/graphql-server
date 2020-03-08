const { gql } = require("apollo-server-express");

module.exports = gql`
  type Book {
    _id: ID!
    title: String!
    author: String!
  }

  type Query {
    findBooks: [Book]
    getBooks: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
  }
`;
