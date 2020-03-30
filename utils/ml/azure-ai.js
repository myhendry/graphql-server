const {
  TextAnalyticsClient,
  TextAnalyticsApiKeyCredential
} = require("@azure/ai-text-analytics");
require("dotenv").config();

const key = process.env.TEXT_ANALYTICS_KEY;
const endpoint = process.env.TEXT_ANALYTICS_URL;
const textAnalyticsClient = new TextAnalyticsClient(
  endpoint,
  new TextAnalyticsApiKeyCredential(key)
);

const sentimentAnalysis = async () => {
  const sentimentInput = ["I hate you", "You are so cute"];
  const sentimentResult = await textAnalyticsClient.analyzeSentiment(
    sentimentInput
  );

  sentimentResult.forEach(document => {
    console.log(`ID: ${document.id}`);
    console.log(`\tDocument Sentiment: ${document.sentiment}`);
    console.log(`\tDocument Scores:`);
    console.log(
      `\t\tPositive: ${document.confidenceScores.positive.toFixed(
        2
      )} \tNegative: ${document.confidenceScores.negative.toFixed(
        2
      )} \tNeutral: ${document.confidenceScores.neutral.toFixed(2)}`
    );
    console.log(`\tSentences Sentiment(${document.sentences.length}):`);
    document.sentences.forEach(sentence => {
      console.log(`\t\tSentence sentiment: ${sentence.sentiment}`);
      console.log(`\t\tSentences Scores:`);
      console.log(
        `\t\tPositive: ${sentence.confidenceScores.positive.toFixed(
          2
        )} \tNegative: ${sentence.confidenceScores.negative.toFixed(
          2
        )} \tNeutral: ${sentence.confidenceScores.neutral.toFixed(2)}`
      );
    });
  });
};

module.exports = { sentimentAnalysis };
