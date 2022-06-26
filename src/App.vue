<template>
  <v-app>
    <v-main>
      <NoteListPage />
      <v-btn
        color="blue"
        fixed
        bottom
        right
        dark
        fab
        x-large
        elevation="2"
        class="mr-8 mb-8"
        :disabled="addNoteDialog"
        @click="toggleAddNoteDialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <addNoteDialog />
      <editNoteDialog />
    </v-main>
  </v-app>
</template>

<script>
import NoteListPage from './components/pages/NoteListPage'
import { mapState, mapActions } from 'vuex'
import dbIdCreation from './utils/dbIdCreation'
import addNoteDialog from './components/sub-componenets/AddNoteDialog.vue'
import editNoteDialog from './components/sub-componenets/EditNoteDialog.vue'

export default {
  name: 'App',

  components: {
    NoteListPage,
    addNoteDialog,
    editNoteDialog,
  },

  data: () => ({}),
  computed: {
    ...mapState({
      dbId: (state) => state.dbId,
      addNoteDialog: (state) => state.addNoteDialog,
    }),
  },
  methods: {
    ...mapActions(['toggleAddNoteDialog']),
    /**
     * Sets a local dbId in state or creates a new one.
     */
    checkAndUpdateDbid() {
      if (localStorage.dbId) {
        this.$store.dispatch('updateDbId', { dbId: localStorage.dbId })
      } else {
        const newDbId = dbIdCreation
        localStorage.dbId = newDbId
        this.$store.dispatch('updateDbId', { dbId: newDbId })
      }
    },
  },
  beforeCreate() {},
  mounted() {},
  created() {
    this.checkAndUpdateDbid()
    this.$store.dispatch('getAllNotes', {})
  },
}
</script>
