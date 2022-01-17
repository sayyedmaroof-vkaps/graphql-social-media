import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { Col, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import PostCard from '../components/PostCard'

const Home = () => {
  const {
    loading,
    data: { getPosts },
  } = useQuery(FETCH_POSTS_QUERY)

  console.log(getPosts)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!loading) {
      //   setPosts(getPosts)
    }
  }, [])

  return (
    <div>
      <h1>This is home page</h1>
      {loading ? (
        <Loader />
      ) : (
        posts && (
          <Row>
            {posts.map(post => (
              <Col key={post.id} md={6} sm={6} lg={4} xl={3}>
                <PostCard post={post} />
                <h4>body</h4>
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
