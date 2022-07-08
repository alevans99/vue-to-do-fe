<template>
  <v-app
    id="main"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <v-main>
      <NoteListPage />
      <listControls />
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
import listControls from './components/sub-componenets/ListControls.vue'
export default {
  name: 'App',

  components: {
    NoteListPage,
    addNoteDialog,
    editNoteDialog,
    listControls,
  },

  data: () => ({}),
  computed: {
    ...mapState({
      dbId: (state) => state.dbId,
      addNoteDialog: (state) => state.addNoteDialog,
      theme() {
        return this.$vuetify.theme.dark ? 'dark' : 'light'
      },
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
<style>
#app {
  background-color: var(--v-background-base);
}
</style>