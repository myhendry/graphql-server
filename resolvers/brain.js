const { sentimentAnalysis } = require("../utils/ml/azure-ai");
const axios = require("axios").default;

module.exports = {
  Query: {
    getSentiment: async () => {
      await sentimentAnalysis();
      return true;
    },
    testPyHelloService: async () => {
      const { data } = await axios.post(
        "https://hendry-python-server.herokuapp.com/hello",
        // "http://localhost:5000/hello",
        {
          list: ["you are stupid idiot", "you are cute"],
          name: "Fred",
          email: "Flintstone@gmail.com"
        }
      );
      const res = data.msg;
      return res;
    }
  },
  Mutation: {
    askPySentiment: async (_, { statement }) => {
      const { data } = await axios.post(
        "https://hendry-python-server.herokuapp.com/brain",
        // "http://localhost:5000/brain",
        {
          list: [statement],
          name: "Fred",
          email: "Flintstone@gmail.com"
        }
      );
      const res = data.sentiment;
      return res;
    }
  }
};
