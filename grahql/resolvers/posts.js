import { AuthenticationError } from 'apollo-server'
import Post from '../../models/Post.js'
import checkAuth from '../../utils/checkAuth.js'

export default {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort('-createdAt')
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    async getPost(parent, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (!post) throw new Error('Post not found!')
        return post
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createPost(parent, { body }, context) {
      const user = checkAuth(context)

      console.log(user)

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      })
      const post = await newPost.save()
      return post
    },
    async deletePost(parent, { postId }, context) {
      const user = checkAuth(context)

      try {
        const post = await Post.findById(postId)
        if (user.username === post.username) {
          await post.remove()
          return 'Post Deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
