const { gql } = require("apollo-server-express");

module.exports = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    findBooks: [Book]
    getBooks: [Book]
  }

  type Mutation {
    addBook(title: String, author: String): Boolean!
  }
`;
