import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import img from '../../assesst/react-logo.png'; // Assuming 'assets' is the correct path

const MainNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={img}
            width="80"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Dashboard</Nav.Link>
            <Nav.Link href="#home">My Profile</Nav.Link>
            <Nav.Link href="#home">Pricing</Nav.Link>
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
