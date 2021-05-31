'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String
  }

  type Query {
    Customer: User
    WholeSeller:User
    BikeShare:User
    Admin:User

  }

  type Mutation {
    signup (username: String!, email: String!, password: String!): User
    login (email: String!, password: String!): String
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
