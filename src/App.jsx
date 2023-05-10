import "bootstrap/dist/css/bootstrap.min.css"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import { NewNote } from "./pages/NewNote"
import { NoteList } from "./pages/NoteList"
import { NoteLayout } from "./layout/NoteLayout"
import { Note } from "./pages/Note"
import { EditNote } from "./pages/EditNote"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { onAuthStateChanged } from "firebase/auth"
import { db, firebaseAuth } from "./utils/firebase-config"
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import useAllNotes from "./hooks/useAllNotes"
import useAllTags from "./hooks/useAllTags"

function App() {
    const [user, setUser] = useState(undefined)
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setUser(currentUser)
        })
    }, [navigate])

    const [notes, setNotes] = useState([])
    const [tags, setTags] = useState([])

    const allNotes = useAllNotes(user?.uid)
    const allTags = useAllTags(user?.uid)

    useEffect(() => {
        setNotes(allNotes)
        setTags(allTags)
    }, [allTags, allNotes])

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return {
                ...note,
                tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
            }
        })
    }, [notes, tags])


    async function onCreateNote({ tags, ...data }) {
        let randId = uuidV4()
        await setDoc(doc(db, "customers", user?.uid, "allNotes", randId), {
            ...data,
            id: randId,
            tagIds: tags.map((tag) => tag.id),
        })
    }

    async function onUpdateNote(id, { tags, ...data }) {
        await updateDoc(doc(db, "customers", user?.uid, "allNotes", id), {
            tagIds: tags.map((tag) => tag.id),
            ...data,
        })
    }

    async function onDeleteNote(id) {
        await deleteDoc(doc(db, "customers", user?.uid, "allNotes", id))
    }

    async function addTag(tag) {
        // let randId = uuidV4()
        await setDoc(doc(db, "customers", user?.uid, "allTags", tag.id), {
            ...tag,
            id: tag.id,
        })
    }

    async function updateTag(id, label) {
        await updateDoc(doc(db, "customers", user?.uid, "allTags", id), {
            label,
        })
    }

    async function deleteTag(id) {
        await deleteDoc(doc(db, "customers", user?.uid, "allTags", id))
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
