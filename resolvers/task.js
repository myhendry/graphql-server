const { combineResolvers } = require("graphql-resolvers");

const { isAuthenticated } = require("./middlewares");

module.exports = {
  Query: {
    getTasks: async (_, __, { Task }) => {
      const tasks = await Task.find({});
      return tasks;
    },
    getUserTasks: combineResolvers(
      isAuthenticated,
      async (_, __, { userId, Task, User }) => {
        const tasks = await Task.find({ user: userId });
        return tasks;
      }
    )
  },
  Mutation: {
    addTask: combineResolvers(
      isAuthenticated,
      async (_, { input }, { userId, User, Task }) => {
        try {
          const user = await User.findOne({ _id: userId });
          const newTask = new Task({ ...input, user });
          const result = await newTask.save();
          user.tasks.push(result.id);
          await user.save();
          return result;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    )
  },
  Task: {
    user: async (parent, __, { User }) => {
      try {
        const user = await User.findById(parent.user);
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
};
