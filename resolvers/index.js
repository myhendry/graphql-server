const { GraphQLDateTime } = require("graphql-iso-date");

const bookResolver = require("./book");
const brainResolver = require("./brain");
const taskResolver = require("./task");
const userResolver = require("./user");
const scraperResolver = require("./scraper");

const customDateScalarResolver = {
  Date: GraphQLDateTime
};

module.exports = [
  bookResolver,
  brainResolver,
  taskResolver,
  userResolver,
  scraperResolver,
  customDateScalarResolver
];
