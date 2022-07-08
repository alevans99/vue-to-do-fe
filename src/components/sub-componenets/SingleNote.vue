<template>
  <v-card class="note-card" elevation="12" color="#F0F6F6">
    <v-container>
      <v-row class="">
        <v-col cols="9" class="pb-0">
          <div class="d-flex flex-column" style="height: 260px">
            <h4 class="ma-4 text-h4">
              {{ note.noteTitle || 'Untitled Note' }}
            </h4>
            <p class="mx-4 body-1 overflow-auto">
              {{ note.noteText || 'This note is blank.' }}
            </p>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="d-flex flex-column align-end">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  x-large
                  :color="alertColor"
                  class="ma-2"
                  v-bind="attrs"
                  v-on="on"
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
                  x-large
                  :color="deadlineColor"
                  class="ma-2"
                  v-bind="attrs"
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
        <v-col cols="6">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-4"
                depressed
                v-bind="attrs"
                fab
                v-on="on"
                @click="editNote()"
              >
                <v-icon dark> mdi-pencil </v-icon>
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
                    color="primary"
                    dark
                    v-bind="{ ...dialogAttrs, ...tooltipAttrs }"
                    v-on="{ ...dialogOn, ...tooltipOn }"
                    fab
                  >
                    <v-icon dark> mdi-close </v-icon>
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
                <v-btn text @click="handleDelete()"> Delete </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="6" class="d-flex justify-end align-center">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                fab
                dark
                :color="completeButtonColor"
                @click="toggleNoteCompletion"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark> mdi-check </v-icon>
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
  }),
  computed: {
    completeButtonColor() {
      const note = this.note
      return note.complete ? 'pink' : 'grey'
    },
    alertColor() {
      const note = this.note
      switch (note.priority) {
        case 3:
          return 'red darken-4'
        case 1:
          return 'green darken-3'
        default:
          return 'yellow darken-1'
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
      console.log(daysUntilDeadline)
      switch (true) {
        case daysUntilDeadline < 1:
          return 'red darken-4'
        case daysUntilDeadline < 3:
          return 'yellow darken-1'
        default:
          return 'green darken-3'
      }
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
    toggleNoteCompletion() {
      const noteToUpdate = { ...this.note }
      noteToUpdate.complete = !noteToUpdate.complete
      this.updateNote({ noteToUpdate })
    },
    editNote() {
      this.startEditing({ noteToEdit: this.note })
    },
    handleDelete() {
      this.deleteNote({ noteToDelete: this.note })
      this.deleteDialog = false
    },
  },
}
</script>
<style scoped>
.note-card {
  border-radius: 20px !important;
  border: 5px solid #084b83 !important;
}
</style>