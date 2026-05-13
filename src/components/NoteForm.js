function NoteForm({notes, setNotes}) {
    return (
            <
            textarea
            value = {notes}
            onChange = {e => setNotes(e.target.value)}
            placeholder = "Write your notes here..."
            rows = "4"
            className = "note-area "
        />
    )
}
export default NoteForm;