import postResolvers from './posts.js'
import userResolvers from './users.js'
import commentResolvers from './comments.js'

export default {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
}
