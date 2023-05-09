import { NoteForm } from "../component/NoteForm"
import { useNote } from "../layout/NoteLayout"

export function EditNote({ onSubmit, onAddTag, availableTags }) {
    const note = useNote()
    return (
        <div style={{ maxWidth: "80%", margin: "2rem auto" }}>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onSubmit={(data) => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </div>
    )
}
