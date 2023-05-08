import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout"
import ReactMarkdown from "react-markdown"


export function Note({ onDelete }) {
    const note = useNote()
    const navigate = useNavigate()

    const handleDelete = () => {
        if(window.confirm(`Are you sure you want to delete ${note.title} ?`)){
            onDelete(note.id)
            navigate("/")
        }
    }

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack
                            gap={1}
                            direction="horizontal"
                            className="flex-wrap"
                        >
                            {note.tags.map((tag) => (
                                <Badge className="text-truncate" key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col md="auto my-4">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.id}/edit`}>
                            <Button variant="primary">Update</Button>
                        </Link>
                        <Button
                            onClick={handleDelete}
                            variant="outline-danger"
                        >
                            Delete
                        </Button>
                        <Link to="/">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}
