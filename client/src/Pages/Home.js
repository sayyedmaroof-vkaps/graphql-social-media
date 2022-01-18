import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
// import gql from 'graphql-tag'
import { Col, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import PostCard from '../components/PostCard'

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts)
    }
  }, [data])

  console.log(posts)

  return (
    <div>
      <h1>Recent Posts</h1>
      {loading ? (
        <Loader />
      ) : (
        posts && (
          <Row>
            {posts.map(post => (
              <Col key={post.id} md={6} sm={6} lg={4} xl={3}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        )
      )}
    </div>
  )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      likeCount
      createdAt
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

export default Home
