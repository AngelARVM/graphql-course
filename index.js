'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const { graphqlHTTP } = require('express-graphql')
const { join } = require('path')
const express = require('express')

require('dotenv').config
const { readFileSync, read } = require('fs')
const { resolvers } = require('./lib/resolvers')
// app express
const app = express()
const port = process.env.port || 3001

// definicion de schema inicial
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')

const schema = makeExecutableSchema({typeDefs, resolvers})

app.use('/api', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}/api`)
})
