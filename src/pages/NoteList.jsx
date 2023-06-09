import { useEffect, useMemo, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import ReactSelect from "react-select"
import NoteCard from "../component/NoteCard/NoteCard"
import EditTagsModal from "../component/EditTagsModal"
import NavBar from "../component/NavBar"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"

export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag }) {
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/login")
        })
    }, [navigate])

    const [selectedTags, setSelectedTags] = useState([])
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            return (
                (title === "" ||
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 ||
                    selectedTags.every((tag) =>
                        note.tags.some((noteTag) => noteTag.id === tag.id)
                    ))
            )
        })
    }, [title, selectedTags, notes])

    const openModal = () => {
        setEditTagsModalIsOpen(true)
    }

    return (
        <>
            <NavBar
                linkText={"/new"}
                text1={"Create"}
                variantText1={"success"}
                fn={openModal}
                text2={"Edit Tags"}
                variantText2={"outline-secondary"}
            />
            <div style={{ maxWidth: "80%", margin: "2rem auto" }}>
                <Form>
                    <Row gap={5}>
                        <Col xs={12} md={6} className="mb-4">
                            <Form.Group controlId="title">
                                <Form.Label>Search using Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} className="mb-4">
                            <Form.Group controlId="tags">
                                <Form.Label>Search using Tags</Form.Label>
                                <ReactSelect
                                    value={selectedTags.map((tag) => {
                                        return {
                                            label: tag.label,
                                            value: tag.id,
                                        }
                                    })}
                                    options={availableTags.map((tag) => {
                                        return {
                                            label: tag.label,
                                            value: tag.id,
                                        }
                                    })}
                                    onChange={(tags) => {
                                        setSelectedTags(
                                            tags.map((tag) => {
                                                return {
                                                    label: tag.label,
                                                    id: tag.value,
                                                }
                                            })
                                        )
                                    }}
                                    isMulti
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                {filteredNotes.length > 0 ? (
                    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                        {filteredNotes.map((note) => (
                            <Col key={note.id}>
                                <NoteCard
                                    id={note.id}
                                    title={note.title}
                                    tags={note.tags}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <h1
                        style={{
                            color: "darksalmon",
                            display: "flex",
                            flexDirection: "column",
                            height: "50vh",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            lineHeight: "3.5rem",
                        }}
                    >{`No notes available at the moment. Please create a new one or update the search query i,e (${title})`}</h1>
                )}
                <EditTagsModal
                    onUpdateTag={onUpdateTag}
                    onDeleteTag={onDeleteTag}
                    show={editTagsModalIsOpen}
                    handleClose={() => setEditTagsModalIsOpen(false)}
                    availableTags={availableTags}
                />
            </div>
        </>
    )
}
