import { NoteForm } from "../component/NoteForm"

export const NewNote = ({ onSubmit, onAddTag, availableTags }) => {
    return (
        <div style={{ maxWidth: "80%", margin: "2rem auto" }}>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </div>
    )
}
