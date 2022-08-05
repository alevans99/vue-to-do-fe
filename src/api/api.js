import axios from 'axios'
const dbApi = axios.create({
  baseURL: 'https://vue-to-do-be.herokuapp.com/api',
})

export const getAllNotes = async (dbId) => {
  const {
    data: { notes },
  } = await dbApi.get(`/notes/${dbId}`)
  return notes
}

export const addNewNote = async (newNote) => {
  const {
    data: { note },
  } = await dbApi.post(`/notes/${newNote.listId}`, { note: newNote })
  return note
}

export const updateNote = async (noteToUpdate) => {
  const {
    data: { note },
  } = await dbApi.patch(`/notes/${noteToUpdate.list_id}`, {
    note: noteToUpdate,
  })
  return note
}
export const deleteNote = async (noteToDelete) => {
  await dbApi.delete(`/notes/${noteToDelete.listId}/${noteToDelete.noteId}`)
  return { message: 'Note Deleted' }
}
