const { books } = require("../constants/books.js");

const BOOK_ADDED = "bookAdded";

module.exports = {
  Subscription: {
    bookAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator(BOOK_ADDED);
      }
    }
  },
  Query: {
    findBooks: () => {
      return books;
    },
    getBooks: (_, __, { Book }) => {
      return Book.find({});
    }
  },
  Mutation: {
    addBook: async (_, data, { pubsub, Book }) => {
      try {
        const book = await Book.create({
          title: data.title,
          author: data.author
        });
        pubsub.publish(BOOK_ADDED, { [BOOK_ADDED]: book });
        return book;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
