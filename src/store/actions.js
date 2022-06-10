import { getAllNotes, addNewNote } from '@/api/api'

export default {
  updateDbId(context, payload) {
    context.commit('updateDbId', payload)
  },
  async getAllNotes(context, payload) {
    try {
      const dbId = context.state.dbId
      if (dbId) {
        const notes = await getAllNotes(dbId)
        payload.notes = notes
        context.commit('getAllNotes', payload)
      }
    } catch (error) {
      console.log(error)
    }
  },
  toggleAddNoteDialog(context) {
    context.commit('toggleAddNoteDialog')
  },
  async addNewNote(context, payload) {
    try {
      const addedNote = await addNewNote(payload.newNote)
      payload.addedNote = addedNote
      context.commit('addNewNote', payload)
    } catch (error) {
      console.log(error)
    }
  },
}
