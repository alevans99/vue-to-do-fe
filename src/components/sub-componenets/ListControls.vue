<template>
  <v-container>
    <div
      class="
        d-flex
        flex-row flex-md-column
        fixed
        justify-space-around justify-md-center
        align-center
        mr-md-6 mr-0
      "
    >
      <v-speed-dial
        v-model="sortSpeedDial"
        direction="top"
        transition="slide-y-reverse-transition"
        class="my-2 mb-md-6"
      >
        <template v-slot:activator>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-model="sortSpeedDial"
                color="accent"
                fab
                elevation="2"
                v-bind="(attrs, buttonSize)"
                v-on="on"
                :disabled="areControlsDisabled"
              >
                <v-icon v-if="sortSpeedDial" color="white"> mdi-close </v-icon>
                <v-icon v-else color="white"> {{ sortButtonIcon }} </v-icon>
              </v-btn>
            </template>
            <span>Sort Notes</span>
          </v-tooltip>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              color="accent"
              v-bind="(attrs, speedDialSize)"
              v-on="on"
              @click="sortNotes({ sortChoice: 'created' })"
              :disabled="areControlsDisabled"
            >
              <v-icon color="white">mdi-clock-outline</v-icon>
            </v-btn>
          </template>
          <span>Date Created</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              color="accent"
              v-bind="(attrs, speedDialSize)"
              v-on="on"
              @click="sortNotes({ sortChoice: 'deadline' })"
              :disabled="areControlsDisabled"
            >
              <v-icon color="white">mdi-clipboard-text-clock</v-icon>
            </v-btn>
          </template>
          <span>Deadline</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              color="accent"
              v-bind="(attrs, speedDialSize)"
              v-on="on"
              @click="sortNotes({ sortChoice: 'priority' })"
              :disabled="areControlsDisabled"
            >
              <v-icon color="white">mdi-alert-octagon</v-icon>
            </v-btn>
          </template>
          <span>Priority</span>
        </v-tooltip>
      </v-speed-dial>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="secondary"
            fab
            elevation="2"
            class="mb-md-6 my-2"
            @click="
              hideCompleted({
                areCompletedNotesHidded: !areCompletedNotesHidded,
              })
            "
            :disabled="areControlsDisabled"
            v-bind="(attrs, buttonSize)"
            v-on="on"
          >
            <v-icon color="white">{{ completedButtonIcon }}</v-icon>
          </v-btn>
        </template>
        <span>{{
          areCompletedNotesHidded ? 'Show All' : 'Hide Completed'
        }}</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            fab
            elevation="2"
            class="mb-md-6 my-2"
            v-bind="(attrs, buttonSize)"
            v-on="on"
            @click="toggleAddNoteDialog"
            :disabled="areControlsDisabled"
          >
            <v-icon color="white">mdi-plus</v-icon>
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
      notesLoading: (state) => state.notesLoading,
      errorFetchingNotes: (state) => state.errorFetchingNotes,
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
    areControlsDisabled() {
      return this.notesLoading || this.errorFetchingNotes
    },
    buttonSize() {
      const size = {
        xs: '',
        sm: 'large',
        md: 'x-large',
        lg: 'x-large',
        xl: 'x-large',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
    speedDialSize() {
      const size = {
        xs: 'small',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
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
    /* background-color: rgba(2, 0, 29, 0.4); */
    background-color: #efb7009b;
    border-top: 3px solid #2e294e;
    left: 0;
  }
}
</style>