import axios from "axios";
const dbApi = axios.create({ baseURL: "http://localhost:9090/api" });

export const getAllNotes = async (dbId) => {
  try {
    const {
      data: { notes },
    } = await dbApi.get(`/notes/${dbId}`);
    console.log(notes);
    return notes;
  } catch (error) {
    console.log(error);
  }
};
