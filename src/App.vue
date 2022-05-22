<template>
  <v-app>
    <v-main>
      <NoteListPage />
    </v-main>
  </v-app>
</template>

<script>
import NoteListPage from './components/pages/NoteListPage'
import { mapState } from 'vuex'
import dbIdCreation from './utils/dbIdCreation'
export default {
  name: 'App',

  components: {
    NoteListPage,
  },

  data: () => ({}),
  computed: {
    ...mapState({
      dbId: (state) => state.dbId,
    }),
  },
  methods: {
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
