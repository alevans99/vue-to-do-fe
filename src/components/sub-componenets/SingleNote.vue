<template>
  <v-card :class="`${noteBackground}`">
    <v-container class="pa-0">
      <v-row class="">
        <v-col
          cols="12"
          sm="9"
          class="pa-1 pa-md-2 pa-lg-4"
          order="2"
          order-sm="1"
        >
          <div class="d-flex flex-column" style="">
            <!-- Was 260px height -->
            <h4
              class="ma-1 ma-md-2 ma-lg-3 text-subtitle-1 text-sm-h5 text-md-h4"
            >
              {{ note.noteTitle || 'Untitled Note' }}
            </h4>
            <p
              class="
                mx-1 mx-md-2 mx-lg-3
                text-body-2 text-md-body-1
                overflow-auto
                mb-0
              "
              style="white-space: pre-line"
            >
              {{ note.noteText || 'This note is blank.' }}
            </p>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          order="1"
          order-sm="2"
          class="pa-1 pb-0 pa-sm-2 pa-md-4"
        >
          <div class="d-flex flex-sm-column align-sm-end justify-end">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :color="alertColor" v-bind="(attrs, iconSize)" v-on="on"
                  >mdi-alert-octagon</v-icon
                >
              </template>
              <span>
                {{ `${formatPriorityToString(note.priority)} Priority` }}</span
              >
            </v-tooltip>

            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="note.deadline"
                  :color="deadlineColor"
                  v-bind="(attrs, iconSize)"
                  v-on="on"
                  >mdi-clipboard-text-clock</v-icon
                >
              </template>
              <span> {{ formatDateFromUtc(note.deadline) || '' }}</span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          class="d-flex justify-sm-start align-center pa-1 pa-lg-2"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-1 ma-md-2 ma-lg-4"
                color="primary"
                v-bind="(attrs, buttonSize)"
                fab
                v-on="on"
                @click="editNote()"
                :disabled="disableButtons"
              >
                <v-icon color="white"> mdi-pencil </v-icon>
              </v-btn>
            </template>
            <span>Edit This Note</span>
          </v-tooltip>
          <v-dialog v-model="deleteDialog" persistent max-width="290">
            <template v-slot:activator="{ on: dialogOn, attrs: dialogAttrs }">
              <v-tooltip top>
                <template
                  v-slot:activator="{ on: tooltipOn, attrs: tooltipAttrs }"
                >
                  <v-btn
                    color="highAlert"
                    v-bind="{ ...buttonSize, ...dialogAttrs, ...tooltipAttrs }"
                    v-on="{ ...dialogOn, ...tooltipOn }"
                    fab
                    :loading="deleteInProgress"
                    :disabled="disableButtons"
                  >
                    <v-icon color="white"> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <span>Delete This Note</span>
              </v-tooltip>
            </template>
            <v-card>
              <v-card-title class="text-h5"> Delete Note? </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="deleteDialog = false"> Cancel </v-btn>
                <v-btn text @click="handleDelete()" color="highAlert">
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="6" class="d-flex justify-end align-center pa-1 pa-lg-2">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :class="`mx-2 ${completeButtonTextColor}--text`"
                fab
                color="primary"
                @click="toggleNoteCompletion"
                v-bind="(attrs, buttonSize)"
                v-on="on"
                :disabled="disableButtons"
                :loading="changingCompleteStatus"
              >
                <v-icon color="white"> {{ completeButtonIcon }} </v-icon>
              </v-btn>
            </template>
            <span>{{
              note.complete ? 'Mark Incomplete' : 'Mark Complete'
            }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { formatDate, formatPriorityToString } from '../../utils/formatters'
import { mapActions } from 'vuex'
import { DateTime } from 'luxon'

export default {
  name: 'SingleNote',
  props: ['note'],

  data: () => ({
    deleteDialog: false,
    deleteInProgress: false,
    changingCompleteStatus: false,
  }),
  computed: {
    completeButtonColor() {
      const note = this.note
      return note.complete ? 'green-color' : 'green-color'
    },
    completeButtonIcon() {
      const note = this.note
      return note.complete ? 'mdi-close' : 'mdi-check'
    },
    completeButtonTextColor() {
      const note = this.note
      return note.complete ? 'white' : 'white'
    },
    noteBackground() {
      const note = this.note
      return note.complete ? 'complete-note' : 'note-card'
    },
    alertColor() {
      const note = this.note
      switch (note.priority) {
        case 3:
          return 'highAlert'
        case 1:
          return 'green darken-3'
        default:
          return 'secondary'
      }
    },
    deadlineColor() {
      const deadline = this.note.deadline
      if (!deadline) {
        return ''
      }
      const daysUntilDeadline = DateTime.fromISO(deadline).diffNow([
        'days',
      ]).days
      switch (true) {
        case daysUntilDeadline < 1:
          return 'highAlert'
        case daysUntilDeadline < 3:
          return 'mediumAlert'
        default:
          return 'secondary'
      }
    },
    disableButtons() {
      return this.deleteInProgress || this.changingCompleteStatus
    },
    size() {
      const size = { xs: 'x-small', sm: 'small', lg: 'large', xl: 'x-large' }[
        this.$vuetify.breakpoint.name
      ]
      return size ? { [size]: true } : {}
    },
    iconSize() {
      const size = {
        xs: '',
        sm: 'large',
        md: 'large',
        lg: 'large',
        xl: 'x-large',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
    buttonSize() {
      const size = {
        xs: 'x-small',
        sm: 'small',
        md: '',
        lg: '',
        xl: '',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
  },
  methods: {
    ...mapActions([
      'updateNote',
      'toggleEditNoteDialog',
      'startEditing',
      'deleteNote',
    ]),
    formatDateFromUtc(utcIsoDate) {
      return formatDate(utcIsoDate) || ''
    },
    formatPriorityToString(priorityInt) {
      return formatPriorityToString(priorityInt)
    },
    async toggleNoteCompletion() {
      this.changingCompleteStatus = true
      const noteToUpdate = { ...this.note }
      noteToUpdate.complete = !noteToUpdate.complete
      await this.updateNote({ noteToUpdate })
      this.changingCompleteStatus = false
    },
    editNote() {
      this.startEditing({ noteToEdit: this.note })
    },
    async handleDelete() {
      this.deleteInProgress = true
      this.deleteDialog = false
      await this.deleteNote({ noteToDelete: this.note })
      this.deleteInProgress = false
    },
  },
}
</script>
<style scoped>
.note-card {
  border-radius: 20px !important;
  border: 5px solid #2e294e !important;
  box-shadow: 0px 10px 14px 2px #2e294e !important;
}

.complete-note {
  border-radius: 20px !important;
  border: 5px solid #306b34 !important;
  box-shadow: 0px 10px 14px 2px #306b34 !important;
  background: repeating-linear-gradient(
    45deg,
    #ccddcd,
    #ccddcd 20px,
    #fff 20px,
    #fff 30px
  ) !important;
}
</style>