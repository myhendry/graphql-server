const http = require("http");
const express = require("express");
const { ApolloServer, PubSub } = require("apollo-server-express");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const Book = require("./models/Book");
require("dotenv").config();
require("./config/db");

const pubsub = new PubSub();

const app = express();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return {
        ...connection.context,
        pubsub
      };
    } else {
      // check from req
      console.log("req ", req);
      const token = req.headers.authorization || "";
      console.log("server token", token);

      return { pubsub, token, Book };
    }
  }
});

//Mount a jwt or other authentication middleware that is run before the GraphQL execution
// app.use(path, jwtCheck);

// server.applyMiddleware({ app, path });

server.applyMiddleware({ app, cors: true });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
