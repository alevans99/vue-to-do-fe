<template>
  <v-card>
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
            <v-icon x-large :color="alertColor" class="ma-2"
              >mdi-alert-octagon</v-icon
            >
            <h4 class="`xa-4 text-h6 text-right`">
              {{ formatDateFromUtc(note.deadline) || '' }}
            </h4>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn class="ma-4" depressed @click="editNote()">Edit</v-btn>
          <v-dialog v-model="deleteDialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Delete
              </v-btn>
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
        <v-col cols="6" class="d-flex justify-end">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            :color="completeButtonColor"
            @click="toggleNoteCompletion"
          >
            <v-icon dark> mdi-check </v-icon>
          </v-btn>
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
      console.log(daysUntilDeadline.days)
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
