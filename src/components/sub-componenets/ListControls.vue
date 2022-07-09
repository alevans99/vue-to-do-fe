<template>
  <v-container>
    <div
      class="
        d-flex
        flex-row flex-md-column
        fixed
        px-6
        justify-space-around justify-md-center
        align-center
      "
    >
      <v-speed-dial
        v-model="sortSpeedDial"
        direction="top"
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-model="sortSpeedDial"
                color="purple"
                dark
                fab
                elevation="2"
                x-large
                class="mb-md-6 my-4"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon v-if="sortSpeedDial"> mdi-close </v-icon>
                <v-icon v-else> {{ sortButtonIcon }} </v-icon>
              </v-btn>
            </template>
            <span>Sort Notes</span>
          </v-tooltip>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              large
              color="purple"
              v-bind="attrs"
              v-on="on"
              @click="sortNotes({ sortChoice: 'created' })"
            >
              <v-icon>mdi-clock-outline</v-icon>
            </v-btn>
          </template>
          <span>Date Created</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              large
              color="purple"
              v-bind="attrs"
              v-on="on"
              @click="sortNotes({ sortChoice: 'deadline' })"
            >
              <v-icon>mdi-clipboard-text-clock</v-icon>
            </v-btn>
          </template>
          <span>Deadline</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              large
              color="purple"
              v-bind="attrs"
              v-on="on"
              @click="sortNotes({ sortChoice: 'priority' })"
            >
              <v-icon>mdi-alert-octagon</v-icon>
            </v-btn>
          </template>
          <span>Priority</span>
        </v-tooltip>
      </v-speed-dial>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="green"
            dark
            fab
            x-large
            elevation="2"
            class="mb-md-6 my-4"
            @click="
              hideCompleted({
                areCompletedNotesHidded: !areCompletedNotesHidded,
              })
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ completedButtonIcon }}</v-icon>
          </v-btn>
        </template>
        <span>{{
          areCompletedNotesHidded ? 'Show All' : 'Hide Completed'
        }}</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue"
            dark
            fab
            x-large
            elevation="2"
            class="mb-md-6 my-4"
            v-bind="attrs"
            v-on="on"
            @click="toggleAddNoteDialog"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add a note</span>
      </v-tooltip>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'ListControls',

  data: () => ({
    sortSpeedDial: false,
  }),
  methods: {
    ...mapActions(['sortNotes', 'hideCompleted', 'toggleAddNoteDialog']),
  },
  computed: {
    ...mapState({
      dbId: (state) => state.dbId,
      notes: (state) => state.notes,
      showCompleted: (state) => state.showCompleted,
      sortChoice: (state) => state.sortChoice,
      areCompletedNotesHidded: (state) => state.areCompletedNotesHidded,
    }),
    ...mapGetters([]),
    completedButtonIcon() {
      return this.areCompletedNotesHidded ? 'mdi-eye' : 'mdi-eye-off'
    },
    sortButtonIcon() {
      switch (this.sortChoice) {
        case 'created':
          return 'mdi-clock-outline'
        case 'deadline':
          return 'mdi-clipboard-text-clock'
        case 'priority':
          return 'mdi-alert-octagon'
        default:
          return 'mdi-clock-outline'
      }
    },
  },
}
</script>
<style scoped>
.fixed {
  position: fixed;
  text-align: center;
  bottom: 0;
  right: 0;
}
@media (min-width: 0px) and (max-width: 959px) {
  .fixed {
    background-color: rgba(0, 0, 0, 0.1);
    left: 0;
  }
}
</style>