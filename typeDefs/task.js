const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getTasks: [Task]
    getUserTasks: [Task]
  }

  extend type Mutation {
    addTask(input: addTaskInput!): Task
  }

  input addTaskInput {
    name: String!
    completed: Boolean!
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }
`;
