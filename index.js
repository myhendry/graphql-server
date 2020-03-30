const http = require("http");
const express = require("express");
const {
  ApolloServer,
  PubSub,
  AuthenticationError
} = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const DataLoader = require("dataloader");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const Book = require("./models/Book");
const Task = require("./models/Task");
const User = require("./models/User");
const findOrMakeUser = require("./utils/findOrMakeUser");
const loaders = require("./loaders");

require("dotenv").config();
require("./config/db");

const pubsub = new PubSub();

const app = express();

//! Example using Express Middlewares
// app.use(cors())

const PORT = process.env.PORT || 4000;

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: process.env.AUTH0_CLIENTID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
};

const getUser = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getKey, options, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded.email);
    });
  });
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      // console.log(connection);
      return {
        ...connection.context,
        pubsub
      };
    } else {
      try {
        const token = req.headers.authorization || "";

        if (token) {
          console.log("server token", token);
          const authUser = getUser(token);
          console.log("server authUser", authUser);
          const authenticatedEmail = await authUser;
          console.log("server auth email ", authenticatedEmail);
          const { id: userId } = await findOrMakeUser(authenticatedEmail);
          return {
            loaders: {
              user: new DataLoader(keys => loaders.user.batchUsers(keys))
            },
            pubsub,
            userId,
            Book,
            Task,
            User
          };
        }

        return {
          loaders: {
            user: new DataLoader(keys => loaders.user.batchUsers(keys))
          },
          pubsub,
          Book,
          Task,
          User
        };
      } catch (error) {
        throw new AuthenticationError("Access Denied! Need to authenticate");
      }
    }
  }
});

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
