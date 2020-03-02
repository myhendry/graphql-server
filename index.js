const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const Book = require("./models/Book");
require("dotenv").config();
require("./config/db");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      Book
    };
  }
});

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
// app.use(path, jwtCheck);

// server.applyMiddleware({ app, path });

server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
