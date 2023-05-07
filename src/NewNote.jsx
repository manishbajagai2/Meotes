import { NoteForm } from "./NoteForm"

export const NewNote = ({ onSubmit, onAddTag, availableTags }) => {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </>
    )
}
