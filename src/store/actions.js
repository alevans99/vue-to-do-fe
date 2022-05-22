import { getAllNotes } from "@/api/api";

export default {
  updateDbId(context, payload) {
    context.commit("updateDbId", payload);
  },
  async getAllNotes(context, payload) {
    const dbId = context.state.dbId;
    if (dbId) {
      const notes = await getAllNotes(dbId);
      payload.notes = notes;
      context.commit("getAllNotes", payload);
    }
  },
};
