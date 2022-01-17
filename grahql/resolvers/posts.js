import { AuthenticationError, UserInputError } from 'apollo-server'
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

      if (body.trim() === '') throw new Error('Post body must not be empty!')

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

    likePost: async (parent, { postId }, context) => {
      const { username } = checkAuth(context)

      const post = await Post.findById(postId)

      if (post) {
        if (post.likes.find(like => like.username === username)) {
          // Post already liked, Unlike the post
          post.likes = post.likes.filter(like => like.username !== username)
          await post.save()
        } else {
          // not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          })
        }
        await post.save()
        return post
      } else throw new UserInputError('post not found')
    },
  },
}
