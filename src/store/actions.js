import { getAllNotes, addNewNote, updateNote, deleteNote } from '@/api/api'

export default {
  updateDbId(context, payload) {
    context.commit('updateDbId', payload)
  },

  async getAllNotes({ commit, dispatch, state }, payload) {
    try {
      const dbId = state.dbId
      if (dbId) {
        const notes = await getAllNotes(dbId)
        payload.notes = notes
        commit('getAllNotes', payload)
      }
    } catch (error) {
      dispatch('toggleErrorDialog', { errorDialog: true, error: error })
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
  async addNewNote({ commit, dispatch }, payload) {
    try {
      const addedNote = await addNewNote(payload.newNote)
      payload.addedNote = addedNote
      commit('addNewNote', payload)
    } catch (error) {
      dispatch('toggleErrorDialog', { errorDialog: true, error: error })
    }
  },

  /**
   * Updating Notes
   */

  async updateNote({ commit, dispatch }, payload) {
    try {
      const updatedNote = await updateNote(payload.noteToUpdate)
      payload.updatedNote = updatedNote
      commit('updateNote', payload)
    } catch (error) {
      dispatch('toggleErrorDialog', { errorDialog: true, error: error })
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

  async deleteNote({ commit, dispatch }, payload) {
    try {
      await deleteNote(payload.noteToDelete)
      commit('deleteNote', payload)
    } catch (error) {
      dispatch('toggleErrorDialog', { errorDialog: true, error: error })
    }
  },

  /**
   * Sorting Notes
   */
  sortNotes(context, payload) {
    context.commit('sortNotes', payload)
  },
  /**
   * Hide Completed
   */
  hideCompleted(context, payload) {
    context.commit('hideCompleted', payload)
  },
  toggleErrorDialog(context, payload) {
    context.commit('toggleErrorDialog', payload)
  },
}
