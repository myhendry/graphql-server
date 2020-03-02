const { ApolloServer } = require("apollo-server");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
require("dotenv").config();
require("./config/db");

const server = new ApolloServer({ typeDefs, resolvers });

console.log(process.env.MONGO_URI);
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
