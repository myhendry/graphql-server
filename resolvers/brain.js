const { sentimentAnalysis } = require("../utils/ml/azure-ai");
const axios = require("axios").default;

module.exports = {
  Query: {
    getSentiment: async () => {
      await sentimentAnalysis();
      return true;
    },
    testPyMicroService: async () => {
      const { data } = await axios.get(
        "https://enigmatic-dusk-86110.herokuapp.com/hello"
      );
      const res = data.msg;
      console.log("res: ", res);
      return res;
    }
  }
};
