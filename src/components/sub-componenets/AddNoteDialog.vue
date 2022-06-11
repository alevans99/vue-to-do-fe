<template>
  <v-row justify="center">
    <v-dialog persistent max-width="800px" :value="addNoteDialog">
      <v-card>
        <v-container class="pa-12">
          <!-- Note Title -->
          <v-row justify="center">
            <v-col cols="12" md="10">
              <v-text-field
                v-model="newNoteTitle"
                label="New Note Title"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Note Text -->
          <v-row justify="center">
            <v-col cols="12" md="10">
              <v-textarea
                v-model="newNoteText"
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
                :return-value.sync="timePicker"
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
              <v-radio-group v-model="prioritySelected" row>
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
                  @click="discardNewNote"
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
                  @click="saveNewNote"
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
  name: 'AddNoteDialog',
  props: [],
  data: () => ({
    newNoteTitle: '',
    newNoteText: '',
    deadlineActive: false,
    datePicker: DateTime.now().plus({ days: 1 }).toISODate(),
    datePickerMenu: false,
    timePicker: '12:00',
    timePickerMenu: false,
    priorityActive: false,
    prioritySelected: '2',
  }),
  computed: {
    ...mapState({
      dbId: (state) => state.dbId,
      addNoteDialog: (state) => state.addNoteDialog,
    }),
    deadlineText() {
      const dateString = DateTime.fromISO(this.datePicker)
        .setLocale('gb')
        .toLocaleString(DateTime.DATE_MED)

      return `This needs to be done by ${dateString} at ${this.timePicker}.`
    },
  },
  methods: {
    ...mapActions(['toggleAddNoteDialog', 'addNewNote']),
    discardNewNote() {
      this.toggleAddNoteDialog()
      this.newNoteTitle = ''
      this.newNoteText = ''
      this.deadlineActive = false
      this.datePicker = DateTime.now().plus({ days: 1 }).toISODate()
      this.datePickerMenu = false
      this.timePicker = '12:00'
      this.timePickerMenu = false
      this.priorityActive = false
      this.prioritySelected = '2'
    },
    saveNewNote() {
      const newNote = {
        listId: this.dbId,
        title: this.newNoteTitle,
        text: this.newNoteText,
        timestamp: DateTime.now().toUTC().toISO(),
        priority: Number(this.prioritySelected),
      }
      if (this.deadlineActive) {
        const isoString = `${this.datePicker}T${this.timePicker}`
        const utcIso = DateTime.fromISO(isoString).toUTC().toISO()
        newNote.deadline = utcIso
      } else {
        newNote.deadline = null
      }
      this.addNewNote({ newNote })
    },
  },
}
</script>
