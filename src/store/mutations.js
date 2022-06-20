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
    state.addNoteDialog = false
    state.notes.unshift(payload.addedNote)
  },
  updateNote(state, payload) {
    for (let i = 0; i < state.notes.length - 1; i++) {
      if (state.notes[i].note_id === payload.updatedNote.note_id) {
        Object.keys(state.notes[i]).forEach((key) => {
          state.notes[i][key] = payload.updatedNote[key]
        })
        break
      }
    }
  },
}
