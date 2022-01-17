import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <Navbar
      className="sticky-top"
      bg="primary"
      variant="dark"
      expand="lg"
      collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Social Media</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            {/* {user ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user"></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutAllHandler}>
                    <i className="fas fa-sign-out-alt"></i> Logout All <br />
                    Devices
                  </NavDropdown.Item>
                </NavDropdown>
              ) : ( */}

            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-sign-in-alt"></i> Login
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>
                <i className="fas fa-user-plus"></i> Register
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
