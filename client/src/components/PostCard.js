import { Button, Card, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const PostCard = ({ post }) => {
  const { body, createdAt, id, username, likeCount, commentCount, likes } = post

  console.log(createdAt)

  return (
    <Card bg="light" text="dark" border="dark" className="my-2 cursor-pointer">
      <Card.Header as="h5">#{username}</Card.Header>
      <Card.Body>
        <Card.Title as="h6">{username}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <hr />
        <small className="timestamps">
          <strong>Created:</strong>{' '}
          <span className="text-muted">
            {new Date(createdAt).toLocaleString()}
          </span>
        </small>
        <br />
      </Card.Body>
      <Card.Footer className="d-flex align-items-center justify-content-between">
        {/* <EditModal className="mx-2" note={note} />
        <DeleteModal className="mx-2" note={note} /> */}
        <div>
          <span className="border border-primary rounded p-1 mx-2">
            <i className="far fa-heart text-primary" />
            <small className="text-muted mx-1">{likeCount}</small>
          </span>
          <span className="border border-primary rounded p-1 mx-2">
            <i className="far fa-comments" />
            <small className="text-muted mx-1">{commentCount}</small>
          </span>
        </div>
        <LinkContainer to={`/posts/${id}`}>
          <Nav.Link className="brn btn-outlined-primary">View Post</Nav.Link>
        </LinkContainer>
      </Card.Footer>
    </Card>
  )
}

export default PostCard
