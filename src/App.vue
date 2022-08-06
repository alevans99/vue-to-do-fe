<template>
  <v-app
    id="main"
    :style="{
      background: $vuetify.theme.themes[theme].background,
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
    }"
  >
    <v-main>
      <noteListPage />
      <listControls />
      <addNoteDialog />
      <editNoteDialog />
      <errorDialog />
    </v-main>
  </v-app>
</template>

<script>
import noteListPage from './components/pages/NoteListPage.vue'
import { mapState, mapActions } from 'vuex'
import dbIdCreation from './utils/dbIdCreation'
import addNoteDialog from './components/sub-componenets/AddNoteDialog.vue'
import editNoteDialog from './components/sub-componenets/EditNoteDialog.vue'
import listControls from './components/sub-componenets/ListControls.vue'
import backgroundUrl from './assets/back.jpg'
import errorDialog from './components/sub-componenets/ErrorDialog.vue'
export default {
  name: 'App',

  components: {
    noteListPage,
    addNoteDialog,
    editNoteDialog,
    listControls,
    errorDialog,
  },

  data: () => ({
    backgroundImage: backgroundUrl,
  }),
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
    this.$store.dispatch('updateNotesLoading', { notesLoading: true })
    this.$store.dispatch('getAllNotes', {})
  },
}
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
  max-width: 100%;
  box-sizing: border-box;
}

#app {
  background-color: #efb700;
}
.green-color {
  background-color: #306b34 !important;
}

@media only screen and (min-width: 960px) {
  .v-dialog {
    border-radius: 20px !important;
    border: 5px solid #2e294e !important;
  }
}
.v-card {
  border-radius: 0 !important;
}
#form-controls {
  position: sticky;
  z-index: 2;
  bottom: 0;
  background-color: #fff;
}
.row {
  margin: 0;
}
</style>