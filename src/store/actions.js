import { getAllNotes, addNewNote, updateNote, deleteNote } from '@/api/api'

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

  /**
   * Adding Notes
   */

  toggleAddNoteDialog(context) {
    context.commit('toggleAddNoteDialog')
  },
  toggleEditNoteDialog(context) {
    context.commit('toggleEditNoteDialog')
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

  /**
   * Updating Notes
   */

  async updateNote(context, payload) {
    try {
      const updatedNote = await updateNote(payload.noteToUpdate)
      payload.updatedNote = updatedNote
      context.commit('updateNote', payload)
    } catch (error) {
      console.log(error)
    }
  },

  updateEditNoteField(context, payload) {
    context.commit('updateEditNoteField', payload)
  },
  startEditing(context, payload) {
    context.commit('startEditing', payload)
  },

  /**
   * Deleting Notes
   */

  async deleteNote(context, payload) {
    try {
      await deleteNote(payload.noteToDelete)
      context.commit('deleteNote', payload)
    } catch (error) {
      console.log(error)
    }
  },
}
