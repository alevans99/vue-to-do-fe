export default {
  updateDbId(state, payload) {
    state.dbId = payload.dbId;
  },
  getAllNotes(state, payload) {
    state.notes = payload.notes;
  },
};
