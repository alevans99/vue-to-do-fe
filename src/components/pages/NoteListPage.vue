<template>
  <v-container>
    <v-row justify="center" align="center" v-if="notesToDisplay.length === 0">
      <v-col cols="12" md="10" lg="8">
        <h3 class="text-h3 text-center white--text">
          Click
          <span>
            <v-btn
              color="primary"
              dark
              fab
              large
              elevation="2"
              class="mb-md-6 my-4"
              @click="toggleAddNoteDialog"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn></span
          >
          to start adding notes!
        </h3>
      </v-col>
    </v-row>

    <v-row v-for="note in notesToDisplay" :key="note.noteId" justify="center">
      <v-col cols="12" md="10" lg="8">
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
      console.log('Note length', this.notes.length)
      return this.notes.length > 0
    },
    ...mapActions(['toggleAddNoteDialog']),
  },
  computed: {
    ...mapState({
      dbId: (state) => state.dbId,
      notes: (state) => state.notes,
      areCompletedNotesHidded: (state) => state.areCompletedNotesHidded,
    }),
    ...mapGetters(['notesToDisplay']),
  },
}
</script>
<style scoped>
.full-length {
  height: 600px;
}
</style>