const { gql } = require("apollo-server-express");

module.exports = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    findBooks: [Book]
    getBooks: [Book]
  }

  extend type Mutation {
    addBook(title: String!, author: String!): Book
  }

  extend type Subscription {
    bookAdded: Book
  }
`;
