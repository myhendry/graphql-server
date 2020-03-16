const { GraphQLDateTime } = require("graphql-iso-date");

const bookResolver = require("./book");
const userResolver = require("./user");
const scraperResolver = require("./scraper");

const customDateScalarResolver = {
  Date: GraphQLDateTime
};

module.exports = [
  bookResolver,
  userResolver,
  scraperResolver,
  customDateScalarResolver
];
