<template>
  <v-container>
    <v-row v-for="note in notesToDisplay" :key="note.noteId" justify="center">
      <v-col cols="12" md="10" lg="8">
        <SingleNote :note="note" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SingleNote from '../sub-componenets/SingleNote.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  components: { SingleNote },
  name: 'NoteListPage',

  data: () => ({}),
  methods: {
    displayNotes() {
      console.log('Note length', this.notes.length)
      return this.notes.length > 0
    },
  },
  computed: {
    ...mapState({
      dbId: (state) => state.dbId,
      notes: (state) => state.notes,
    }),
    ...mapGetters(['notesToDisplay']),
  },
}
</script>
