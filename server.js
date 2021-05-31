'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress } = require('apollo-server-express')
const schema = require('./gql/schema')
const con=require('./config/config')
// const rootSchema = require('./gql/rootSchema')
const jwt = require('express-jwt')
require('dotenv').config()

const PORT = 3000

// create our express app
const app = express()

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

// graphql endpoint
app.use(
  '/api',
  bodyParser.json(),
  auth,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
      email: req.email,
      role: req.role
    }
  }))
)

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/api`)
})
