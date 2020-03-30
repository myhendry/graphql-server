const { sentimentAnalysis } = require("../utils/ml/azure-ai");
const axios = require("axios").default;

module.exports = {
  Query: {
    getSentiment: async () => {
      await sentimentAnalysis();
      return true;
    },
    testPyMicroService: async () => {
      const res = await axios.get(
        "https://enigmatic-dusk-86110.herokuapp.com/hello"
      );
      console.log("res: ", res.data);
      return true;
    }
  }
};
