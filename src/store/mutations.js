export default {
  updateDbId(state, payload) {
    state.dbId = payload.dbId
  },
  getAllNotes(state, payload) {
    state.notes = payload.notes
  },
  toggleAddNoteDialog(state) {
    state.addNoteDialog = !state.addNoteDialog
  },
  addNewNote(state, payload) {
    state.notes.push(payload.newNote)
  },
}