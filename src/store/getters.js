export default {
  incompleteNotes(state) {
    return state.notes.filter((note) => {
      return !note.complete
    })
  },
  completeNotes(state) {
    return state.notes.filter((note) => {
      return note.complete
    })
  },
}
