import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";

export const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Main</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/login">login</Nav.Link>
          <Nav.Link href="/logout">logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}