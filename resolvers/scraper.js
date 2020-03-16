const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

module.exports = {
  Query: {
    scrapeWeb1: async () => {
      let movieUrl = "https://www.imdb.com/title/tt0111164";

      let browser = await puppeteer.launch();
      let page = await browser.newPage();

      const movies = [];

      let i = 1;
      while (i < 3) {
        await page.goto(`https://www.imdb.com/title/tt011116${i}`, {
          waitUntil: "networkidle2"
        });

        let data = await page.evaluate(() => {
          let title = document.querySelector(`div[class="title_wrapper"] > h1`)
            .innerText;
          let rating = document.querySelector(`span[itemprop="ratingValue"]`)
            ? document.querySelector(`span[itemprop="ratingValue"]`).innerText
            : "";
          let count = document.querySelector(`span[itemprop="ratingCount"]`)
            ? document.querySelector(`span[itemprop="ratingCount"]`).innerText
            : "";

          return {
            title,
            rating,
            count
          };
        });

        i++;

        const movie = {
          title: data.title,
          rating: data.rating,
          count: data.count
        };
        movies.push(movie);
      }

      return movies;
    },
    scrapeWeb2: async () => {
      try {
        let url = "https://www.reddit.com";

        let browser = await puppeteer.launch();
        let page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle2" });

        const posts = [];
        const html = await page.content();

        const $ = cheerio.load(html);

        $("h3").each((index, element) => {
          const title = $(element).text();
          posts[index] = { title };
        });

        return posts;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
