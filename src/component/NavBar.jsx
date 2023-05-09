import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"

function NavBar({ linkText, text1, variantText1, fn, text2, variantText2 }) {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            bg="light"
            variant="light"
            style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" }}
            sticky="top"
        >
            <Container fluid style={{ maxWidth: "80%", margin: "auto" }}>
                <Navbar.Brand>
                    <Link
                        to={"/"}
                        style={{ textDecoration: "none", color: "#FF4500" }}
                    >
                        <h1> 🐾 Meotes</h1>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <div
                            style={{
                                display: "flex",
                                gap: "5px",
                                marginRight: "2rem",
                            }}
                        >
                            <Navbar.Text fixed className="my-2 ">
                                Signed in as:
                            </Navbar.Text>
                            <NavDropdown
                                style={{ fontSize: "1.05rem" }}
                                title="Manish"
                                id="collasible-nav-dropdown"
                                className="my-2"
                            >
                                <NavDropdown.Item href="/">
                                    Sign Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <Stack gap={2} direction="horizontal" className="my-2">
                            <Link to={linkText}>
                                <Button variant={variantText1}>{text1}</Button>
                            </Link>
                            <Button onClick={fn} variant={variantText2}>
                                {text2}
                            </Button>
                        </Stack>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
