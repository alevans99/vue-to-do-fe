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
      data: { addedNote },
    } = await dbApi.post(`/notes/${newNote.dbId}`, { note: newNote })
    console.log(addedNote, 'ADD NOTE')
    return addedNote
  } catch (error) {
    console.log(error)
  }
}
