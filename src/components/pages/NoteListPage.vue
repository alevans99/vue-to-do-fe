<template>
  <v-container class="pa-0 mb-16 mb-md-0">
    <v-row justify="center" align="center" v-if="displayCreateNewNotes">
      <v-col cols="12" md="10" lg="8">
        <h3 class="text-h3 text-center white--text">
          Click
          <span>
            <v-btn
              color="primary"
              fab
              large
              elevation="2"
              class="mb-md-6 my-4"
              @click="toggleAddNoteDialog"
            >
              <v-icon color="white">mdi-plus</v-icon>
            </v-btn></span
          >
          to start adding notes!
        </h3>
      </v-col>
    </v-row>
    <v-row
      v-if="notesLoading"
      justify="center"
      align="center"
      style="height: 90vh"
    >
      <v-col
        cols="12"
        md="10"
        lg="8"
        class="d-flex justify-center align-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          :size="100"
          :width="10"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row
      v-for="note in notesToDisplay"
      :key="note.noteId"
      justify="center"
      class="ma-0"
    >
      <v-col cols="12" md="10" lg="8" class="pa-1 pa-sm-2">
        <SingleNote :note="note" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SingleNote from '../sub-componenets/SingleNote.vue'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  components: { SingleNote },
  name: 'NoteListPage',

  data: () => ({}),
  methods: {
    displayNotes() {
      return this.notes.length > 0
    },
    ...mapActions(['toggleAddNoteDialog']),
  },
  computed: {
    ...mapState({
      dbId: (state) => state.dbId,
      notes: (state) => state.notes,
      areCompletedNotesHidded: (state) => state.areCompletedNotesHidded,
      notesLoading: (state) => state.notesLoading,
      errorFetchingNotes: (state) => state.errorFetchingNotes,
    }),
    ...mapGetters(['notesToDisplay']),
    displayCreateNewNotes() {
      return (
        this.notes.length === 0 &&
        !this.notesLoading &&
        !this.errorFetchingNotes
      )
    },
  },
}
</script>
<style scoped>
.full-length {
  height: 600px;
}
</style>