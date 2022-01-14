import { ApolloServer } from 'apollo-server'
import 'dotenv/config'
import connectDB from './config/db.js'
connectDB()

import resolvers from './grahql/resolvers/index.js'
import typeDefs from './grahql/typeDefs.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

server
  .listen({ port: process.env.PORT })
  .then(res => console.log(`server is running on ${res.url}`))
