<template>
  <v-row justify="center">
    <v-dialog persistent max-width="800px" :value="editNoteDialog">
      <v-card>
        <v-container class="pa-12">
          <!-- Note Title -->
          <v-row justify="center">
            <v-col cols="12" md="10">
              <v-text-field
                :value="noteToEdit.noteTitle"
                @input="updateNoteField('noteTitle', $event)"
                label="New Note Title"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Note Text -->
          <v-row justify="center">
            <v-col cols="12" md="10">
              <v-textarea
                :value="noteToEdit.noteText"
                @input="updateNoteField('noteText', $event)"
                label="New Note Text"
              ></v-textarea>
            </v-col>
          </v-row>
          <!-- Optional Deadline Setter -->
          <v-row justify="start">
            <v-col cols="12">
              <v-switch
                v-model="deadlineActive"
                label="Set Deadline"
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
              ><h4>{{ deadlineText }}</h4>
            </v-col>
          </v-row>

          <!-- Optional Priorities -->
          <v-row justify="start">
            <v-col cols="12">
              <v-switch
                v-model="priorityActive"
                label="Set Priority"
              ></v-switch>
            </v-col>
          </v-row>

          <v-row justify="center" v-if="priorityActive" class="d-flex">
            <v-col cols="10">
              <v-radio-group
                :value="noteToEdit.priority.toString()"
                @change="updateNoteField('priority', Number($event))"
                row
              >
                <v-radio label="Low" value="1"></v-radio>
                <v-spacer></v-spacer>
                <v-radio label="Medium" value="2"></v-radio>
                <v-spacer></v-spacer>
                <v-radio label="High" value="3"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <!-- Form Controls -->
          <v-row justify="center">
            <v-col cols="12" md="12">
              <div class="d-flex">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  large
                  color="red"
                  @click="toggleEditNoteDialog"
                >
                  <v-icon dark> mdi-delete </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  large
                  color="primary"
                  @click="saveNote"
                >
                  <v-icon dark> mdi-content-save </v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
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
  }),
  computed: {
    ...mapState({
      editNoteDialog: (state) => state.editNoteDialog,
      noteToEdit: (state) => state.noteToEdit,
    }),
    deadlineText() {
      const dateString = DateTime.fromISO(this.datePicker)
        .setLocale('gb')
        .toLocaleString(DateTime.DATE_MED)

      return `This needs to be done by ${dateString} at ${this.timePicker}.`
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
  },
}
</script>
