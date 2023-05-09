import "bootstrap/dist/css/bootstrap.min.css"
import { Navigate, Route, Routes } from "react-router-dom"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import { NewNote } from "./pages/NewNote"
import { NoteList } from "./pages/NoteList"
import { NoteLayout } from "./layout/NoteLayout"
import { Note } from "./pages/Note"
import { EditNote } from "./pages/EditNote"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

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

    function onUpdateNote(id, { tags, ...data }) {
        setNotes((prevNotes) => {
            return prevNotes.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        ...data,
                        tagIds: tags.map((tag) => tag.id),
                    }
                } else {
                    return note
                }
            })
        })
    }

    function onDeleteNote(id) {
        setNotes((prevNotes) => {
            return prevNotes.filter((note) => note.id !== id)
        })
    }

    function addTag(tag) {
        setTags((prev) => [...prev, tag])
    }

    function updateTag(id, label) {
        setTags((prevTags) => {
            return prevTags.map((tag) => {
                if (tag.id === id) {
                    return { ...tag, label }
                } else {
                    return tag
                }
            })
        })
    }

    function deleteTag(id) {
        setTags((prevTags) => {
            return prevTags.filter((tag) => tag.id !== id)
        })
    }

    return (
        <>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route
                    exact
                    path="/"
                    element={
                        <NoteList
                            notes={notesWithTags}
                            availableTags={tags}
                            onUpdateTag={updateTag}
                            onDeleteTag={deleteTag}
                        />
                    }
                />
                <Route
                    exact
                    path="/new"
                    element={
                        <NewNote
                            onSubmit={onCreateNote}
                            onAddTag={addTag}
                            availableTags={tags}
                        />
                    }
                />
                <Route
                    exact
                    path="/:id"
                    element={<NoteLayout notes={notesWithTags} />}
                >
                    <Route index element={<Note onDelete={onDeleteNote} />} />
                    <Route
                        path="edit"
                        element={
                            <EditNote
                                onSubmit={onUpdateNote}
                                onAddTag={addTag}
                                availableTags={tags}
                            />
                        }
                    />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default App
