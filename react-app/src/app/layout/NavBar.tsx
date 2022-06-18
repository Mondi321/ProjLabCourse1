import React from "react";
import { Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return(
        <Navbar expand="lg" sticky="top" id = "navbar">
            <Container fluid>
                <Navbar.Brand as={NavLink} to='/homePage' className="brend">Restaurant</Navbar.Brand>
                <Navbar.Toggle style = {{background: 'white'}} aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0 nav"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link as={NavLink} to='/ushqimet' className="ushqimet">Ushqimet</Nav.Link>
                    <Nav.Link as={NavLink} to='/errors' className="ushqimet">Errors</Nav.Link>
                    <Nav.Item as={NavLink} to='/createUshqimi'>
                        <Button style = {{color: 'white'}} variant="primary">Create Ushqimi</Button>
                    </Nav.Item>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="primary">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}