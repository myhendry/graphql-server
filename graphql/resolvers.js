const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  },
  {
    title: "Alice in Wonderland",
    author: "Tom Sawyer"
  }
];

module.exports = {
  Query: {
    books: () => books
  }
};
