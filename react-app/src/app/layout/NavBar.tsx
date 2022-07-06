import React from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand>Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/home">Home</Nav.Link>
                        <NavDropdown title="Ushqimet" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/ushqimet">Ushqimet</NavDropdown.Item>
                            <NavDropdown.Item href="/createUshqimi">
                                Create Ushqimi
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Pijet" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/pijet">Pijet</NavDropdown.Item>
                            <NavDropdown.Item href="/createPije">
                                Create Pije
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Embelsirat" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/embelsirat">Embelsirat</NavDropdown.Item>
                            <NavDropdown.Item href="/createEmbelsira">
                                Create Embelsira
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Contact" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/contacts">Contacts</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Stafi" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/stafi">Stafi</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/shtetet">Shtetet</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/qytetet">Qytetet</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/gjinite">Gjinia</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/bankat">Bankat</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Rezervimet" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/rezervimet">Rezervimet</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Eventet" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/eventet">Eventet</NavDropdown.Item>
                            <NavDropdown.Item href="/createEventi">
                                Create Eventi
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
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








        // <Navbar expand="lg" sticky="top" id = "navbar">
        //     <Container fluid>
        //         <Navbar.Brand as={NavLink} exact to='/' className="brend">Restaurant</Navbar.Brand>
        //         <Navbar.Toggle style = {{background: 'white'}} aria-controls="navbarScroll" />
        //         <Navbar.Collapse id="navbarScroll">
        //         <Nav
        //             className="me-auto my-2 my-lg-0 nav"
        //             style={{ maxHeight: '100px' }}
        //             navbarScroll
        //         >
        //             <Nav.Link as={NavLink} to='/ushqimet' className="ushqimet">Ushqimet</Nav.Link>
        //             <Nav.Link as={NavLink} to='/errors' className="ushqimet">Errors</Nav.Link>
        //             <Nav.Item as={NavLink} to='/createUshqimi'>
        //                 <Button style = {{color: 'white'}} variant="primary">Create Ushqimi</Button>
        //             </Nav.Item>
        //         </Nav>
        //         <Form className="d-flex">
        //             <FormControl
        //             type="search"
        //             placeholder="Search"
        //             className="me-2"
        //             aria-label="Search"
        //             />
        //             <Button variant="primary">Search</Button>
        //         </Form>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    )
}