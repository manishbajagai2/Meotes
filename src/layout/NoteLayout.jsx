import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"

export function NoteLayout({ notes }) {
  const { id } = useParams()
  const note = notes.find(n => n.id === id)

  if (note == null) return <Navigate to="/" replace />

  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext()
}