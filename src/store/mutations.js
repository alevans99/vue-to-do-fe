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
  toggleEditNoteDialog(state) {
    state.editNoteDialog = !state.editNoteDialog
  },
  addNewNote(state, payload) {
    state.addNoteDialog = false
    state.notes.unshift(payload.addedNote)
  },
  updateNote(state, payload) {
    for (let i = 0; i < state.notes.length; i++) {
      if (state.notes[i].noteId === payload.updatedNote.noteId) {
        Object.keys(state.notes[i]).forEach((key) => {
          state.notes[i][key] = payload.updatedNote[key]
        })
        break
      }
    }
  },
  updateEditNoteField(state, payload) {
    state.noteToEdit[payload.key] = payload.value
  },
  startEditing(state, payload) {
    state.noteToEdit = { ...payload.noteToEdit }
    state.editNoteDialog = true
  },
  deleteNote(state, payload) {
    const deletedId = payload.noteToDelete.noteId
    const indexToDelete = state.notes.findIndex((note) => {
      return note.noteId === deletedId
    })
    state.notes.splice(indexToDelete, 1)
  },
  sortNotes(state, payload) {
    state.sortChoice = payload.sortChoice
  },
  hideCompleted(state, payload) {
    state.areCompletedNotesHidded = payload.areCompletedNotesHidded
  },
}
