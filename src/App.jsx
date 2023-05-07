import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import { NewNote } from "./NewNote"

function App() {
    const [notes, setNotes] = useLocalStorage("NOTES", [])
    const [tags, setTags] = useLocalStorage("TAGS", [])

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return {
                ...note,
                tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
            }
        })
    }, [notes, tags])

    function onCreateNote({ tags, ...data }) {
        setNotes((prevNotes) => {
            return [
                ...prevNotes,
                { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
            ]
        })
    }

    function addTag(tag) {
        setTags((prev) => [...prev, tag])
    }

    return (
        <Container className="my-4">
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route
                    path="/new"
                    element={
                        <NewNote
                            onSubmit={onCreateNote}
                            onAddTag={addTag}
                            availableTags={tags}
                        />
                    }
                />
                <Route path="/:id">
                    <Route index element={<h1>Show</h1>} />
                    <Route path="edit" element={<h1>Edit</h1>} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    )
}

export default App
