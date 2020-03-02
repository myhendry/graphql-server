const books = [
  { title: "Alice in Wonderland", author: "Bryan Robson" },
  { title: "Spiderman", author: "Ali Imran" }
];

module.exports = {
  Query: {
    findBooks: () => {
      return books;
    },
    getBooks: (_, __, { Book }) => {
      return Book.find({});
    }
  },
  Mutation: {
    addBook: async (_, data, { Book }) => {
      try {
        await Book.create({
          title: data.title,
          author: data.author
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
