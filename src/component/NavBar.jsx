import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link, useNavigate } from "react-router-dom"
import { firebaseAuth } from "../utils/firebase-config"
import { signOut } from "firebase/auth"

function NavBar(props) {
    const navigate = useNavigate()

    const [user, setUser] = useState(undefined)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setUser(currentUser)
        })
    }, [navigate])

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
                    {Object.keys(props).length > 2 ? (
                        <Nav>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                    marginRight: "2rem",
                                }}
                            >
                                <Navbar.Text fixed="true" className="my-2 ">
                                    Signed in as:
                                </Navbar.Text>
                                <NavDropdown
                                    style={{ fontSize: "1.05rem" }}
                                    title={user?.displayName || "guest"}
                                    id="collasible-nav-dropdown"
                                    className="my-2"
                                >
                                    <NavDropdown.Item
                                        onClick={() => signOut(firebaseAuth)}
                                    >
                                        Sign Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                            <Stack
                                gap={2}
                                direction="horizontal"
                                className="my-2"
                            >
                                <Link to={props.linkText}>
                                    <Button variant={props.variantText1}>
                                        {props.text1}
                                    </Button>
                                </Link>
                                <Button
                                    onClick={props.fn}
                                    variant={props.variantText2}
                                >
                                    {props.text2}
                                </Button>
                            </Stack>
                        </Nav>
                    ) : (
                        <Nav>
                            <Link to={props.linkText}>
                                <Button variant="primary">{props.text1}</Button>
                            </Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar
