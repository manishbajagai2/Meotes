import { Badge, Col, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useNote } from "../layout/NoteLayout"
import ReactMarkdown from "react-markdown"
import { NavBar } from "../component/NavBar"

export function Note({ onDelete }) {
    const note = useNote()
    const navigate = useNavigate()

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${note.title} ?`)) {
            onDelete(note.id)
            navigate("/")
        }
    }

    return (
        <>
            <NavBar
                linkText={`/${note.id}/edit`}
                text1={"Update"}
                fn={handleDelete}
                text2={"Delete"}
                secondButtonVariant={"outline-danger"}
            />
            <Row className="mb-4">
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
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}
