import { Button, Col, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

export const NavBar = ({ linkText, text1, fn, text2, secondButtonVariant }) => {
    return (
        <Row className="align-items-center mb-4">
            <Col>
                <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "#464646" }}
                >
                    <h1> 🐾 Meotes</h1>
                </Link>
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to={linkText}>
                        <Button variant="primary">{text1}</Button>
                    </Link>
                    <Button onClick={fn} variant={secondButtonVariant}>
                        {text2}
                    </Button>
                </Stack>
            </Col>
        </Row>
    )
}
