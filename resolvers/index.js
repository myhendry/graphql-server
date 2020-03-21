const { GraphQLDateTime } = require("graphql-iso-date");

const bookResolver = require("./book");
const taskResolver = require("./task");
const userResolver = require("./user");
const scraperResolver = require("./scraper");

const customDateScalarResolver = {
  Date: GraphQLDateTime
};

module.exports = [
  bookResolver,
  taskResolver,
  userResolver,
  scraperResolver,
  customDateScalarResolver
];
