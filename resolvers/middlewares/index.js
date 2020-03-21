const { skip } = require("graphql-resolvers");

module.exports.isAuthenticated = async (_, __, { userId }) => {
  if (!userId) {
    throw new Error("Access Denied! Please authenticate to proceed");
  }

  return skip;
};
