<template>
  <div>
    <v-dialog persistent max-width="800px" :value="editNoteDialog">
      <v-card>
        <v-form class="pa-10" ref="form">
          <!-- Note Title -->
          <v-row justify="center">
            <v-col cols="12">
              <v-text-field
                :value="noteToEdit.noteTitle"
                @input="updateNoteField('noteTitle', $event)"
                label="New Note Title"
                required
                outlined
                :rules="editValidation"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Note Text -->
          <v-row justify="center">
            <v-col cols="12">
              <v-textarea
                :value="noteToEdit.noteText"
                @input="updateNoteField('noteText', $event)"
                label="New Note Text"
                outlined
                :rules="editValidation"
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- Optional Priorities -->

          <v-row justify="center" class="d-flex">
            <v-col cols="12" class="d-flex justify-space-around">
              <div class="d-flex justify-center flex-column">
                <p class="text-center text-body-1">Low</p>
                <v-btn
                  fab
                  dark
                  :color="getPriorityColor(1)"
                  @click="updateNoteField('priority', 1)"
                >
                  <v-icon dark> mdi-alert-octagon </v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-center flex-column">
                <p class="text-center text-body-2">Medium</p>
                <v-btn
                  fab
                  dark
                  :color="getPriorityColor(2)"
                  @click="updateNoteField('priority', 2)"
                >
                  <v-icon dark> mdi-alert-octagon </v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-center flex-column">
                <p class="text-center text-body-2">High</p>
                <v-btn
                  fab
                  dark
                  :color="getPriorityColor(3)"
                  @click="updateNoteField('priority', 3)"
                >
                  <v-icon dark> mdi-alert-octagon </v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <!-- Optional Deadline Setter -->
          <v-row justify="start">
            <v-col cols="12">
              <v-switch
                v-model="deadlineActive"
                label="Add Deadline"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="deadlineActive">
            <v-col cols="6" md="6">
              <v-menu
                ref="dateRef"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="320px"
                min-width="320px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="datePicker"
                    label="Set Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-if="datePickerMenu"
                  v-model="datePicker"
                  full-width
                  @input="datePickerMenu = false"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" md="6">
              <v-menu
                ref="timePicker"
                v-model="timePickerMenu"
                :close-on-content-click="false"
                :return-value.sync="timePicker"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="timePicker"
                    label="Set Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timePickerMenu"
                  v-model="timePicker"
                  full-width
                  @click:minute="$refs.timePicker.save(timePicker)"
                  format="24hr"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12"
              ><h5 class="text-h5 text-center">{{ deadlineText }}</h5>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
      <!-- Form Controls -->
      <v-card-actions id="form-controls">
        <div class="d-flex flex-column flex-grow-1">
          <v-divider></v-divider>
          <div class="d-flex ma-0 pa-8 flex-grow-1 justify-space-between">
            <v-btn
              fab
              dark
              large
              color="highAlert"
              @click="toggleEditNoteDialog"
            >
              <v-icon dark> mdi-close </v-icon>
            </v-btn>
            <v-btn
              fab
              large
              color="primary"
              @click="saveNote"
              :disabled="saveDisabled"
            >
              <v-icon dark> mdi-content-save </v-icon>
            </v-btn>
          </div>
        </div>
      </v-card-actions>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { DateTime } from 'luxon'

export default {
  name: 'EditNoteDialog',
  props: [],
  data: () => ({
    datePicker: null,
    timePicker: null,
    deadlineActive: false,
    datePickerMenu: false,
    timePickerMenu: false,
    priorityActive: false,
    editValidation: [
      (value) => {
        return (value !== null && value !== '') || 'Please enter information'
      },
    ],
  }),
  computed: {
    ...mapState({
      editNoteDialog: (state) => state.editNoteDialog,
      noteToEdit: (state) => state.noteToEdit,
    }),
    deadlineText() {
      if (this.timePicker === null || this.datePicker === null) {
        return ''
      }
      const dateString = DateTime.fromISO(this.datePicker)
        .setLocale('gb')
        .toLocaleString(DateTime.DATE_MED)

      return `This needs to be done by ${dateString} at ${this.timePicker}.`
    },
    saveDisabled() {
      return this.noteToEdit.noteTitle === '' || this.noteToEdit.noteText === ''
    },
  },
  watch: {
    //Every time the dialog opens, set the initial values.
    editNoteDialog(newValue) {
      if (newValue) {
        this.deadlineActive = this.noteToEdit.deadline !== null
        this.datePicker =
          this.parseDate(this.noteToEdit.deadline) ||
          DateTime.now().plus({ days: 1 }).toISODate()
        this.timePicker = this.parseTime(this.noteToEdit.deadline) || '12:00'
        this.priorityActive = this.noteToEdit.priority !== 2
      }
    },

    //Construct and update the new deadline on change
    datePicker(newValue) {
      const isoString = `${newValue}T${this.timePicker}`
      const utcIso = DateTime.fromISO(isoString).toUTC().toISO()
      this.updateNoteField('deadline', utcIso)
    },
    timePicker(newValue) {
      const isoString = `${this.datePicker}T${newValue}`
      const utcIso = DateTime.fromISO(isoString).toUTC().toISO()
      this.updateNoteField('deadline', utcIso)
    },
  },
  methods: {
    ...mapActions([
      'toggleEditNoteDialog',
      'updateNote',
      'updateEditNoteField',
    ]),
    saveNote() {
      this.updateNote({ noteToUpdate: { ...this.noteToEdit } })
      this.toggleEditNoteDialog()
    },
    updateNoteField(key, value) {
      this.updateEditNoteField({ key, value })
    },
    parseDate(isoDateTime) {
      return DateTime.fromISO(isoDateTime).toISODate()
    },
    parseTime(isoDateTime) {
      if (isoDateTime) {
        return DateTime.fromISO(isoDateTime).toFormat('HH:mm')
      }
      return null
    },
    getPriorityColor(priority) {
      const colors = {
        1: 'secondary',
        2: 'mediumAlert',
        3: 'highAlert',
      }
      return this.noteToEdit.priority === priority ? colors[priority] : 'grey'
    },
  },
}
</script>
