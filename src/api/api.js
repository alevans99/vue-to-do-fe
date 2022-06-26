import axios from 'axios'
const dbApi = axios.create({ baseURL: 'http://localhost:9090/api' })

export const getAllNotes = async (dbId) => {
  try {
    const {
      data: { notes },
    } = await dbApi.get(`/notes/${dbId}`)
    console.log(notes)
    return notes
  } catch (error) {
    console.log(error)
  }
}

export const addNewNote = async (newNote) => {
  try {
    const {
      data: { note },
    } = await dbApi.post(`/notes/${newNote.listId}`, { note: newNote })
    return note
  } catch (error) {
    console.log(error)
  }
}

export const updateNote = async (noteToUpdate) => {
  try {
    const {
      data: { note },
    } = await dbApi.patch(`/notes/${noteToUpdate.list_id}`, {
      note: noteToUpdate,
    })
    return note
  } catch (error) {
    console.log(error)
  }
}
export const deleteNote = async (noteToDelete) => {
  try {
    await dbApi.delete(`/notes/${noteToDelete.listId}/${noteToDelete.noteId}`)
    return { message: 'Note Deleted' }
  } catch (error) {
    console.log(error)
  }
}
