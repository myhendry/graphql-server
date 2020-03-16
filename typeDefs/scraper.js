const { gql } = require("apollo-server-express");

module.exports = gql`
  type ImdbPost {
    title: String
    rating: String
    count: String
  }

  type RedditPost {
    title: String
  }

  extend type Query {
    scrapeWeb1: ImdbPost
    scrapeWeb2: [RedditPost]
  }
`;
