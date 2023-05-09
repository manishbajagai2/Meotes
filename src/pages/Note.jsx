import { Badge, Col, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useNote } from "../layout/NoteLayout"
import ReactMarkdown from "react-markdown"
import NavBar from "../component/NavBar"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"

export function Note({ onDelete }) {

    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/login")
        })
    }, [navigate])

    const note = useNote()

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
                variantText1="primary"
                fn={handleDelete}
                text2={"Delete"}
                variantText2={"outline-danger"}
            />
            <div style={{ maxWidth: "80%", margin: "2rem auto" }}>
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
                                    <Badge
                                        className="text-truncate"
                                        key={tag.id}
                                    >
                                        {tag.label}
                                    </Badge>
                                ))}
                            </Stack>
                        )}
                    </Col>
                </Row>
                <ReactMarkdown>{note.markdown}</ReactMarkdown>
            </div>
        </>
    )
}
