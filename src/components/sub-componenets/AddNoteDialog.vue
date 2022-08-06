<template>
  <v-row justify="center" class="ma-0">
    <v-dialog
      persistent
      max-width="800px"
      :value="addNoteDialog"
      v-bind="fullScreenDialog"
    >
      <v-card>
        <v-form class="pa-2 pa-md-4" ref="form">
          <!-- Note Title -->
          <v-row justify="center">
            <v-col cols="12" md="12" class="pa-0">
              <v-text-field
                v-model="newNoteTitle"
                label="New Note Title"
                required
                outlined
                :rules="createValidation"
                :disabled="saveInProgress"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- Note Text -->
          <v-row justify="center">
            <v-col cols="12" md="12" class="pa-0">
              <v-textarea
                v-model="newNoteText"
                label="New Note Text"
                outlined
                :rules="createValidation"
                :disabled="saveInProgress"
                no-resize
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
          <!-- Optional Priorities -->
          <v-row justify="center" class="d-flex">
            <v-col cols="12" class="d-flex justify-space-around pa-0">
              <div class="d-flex justify-center flex-column align-center">
                <p class="text-center text-body-2 text-sm-body-1">Low</p>
                <v-btn
                  fab
                  v-bind="prioritybuttonSize"
                  :color="getPriorityColor('1')"
                  @click="prioritySelected = '1'"
                  :disabled="saveInProgress"
                >
                  <v-icon color="white"> mdi-alert-octagon </v-icon>
                </v-btn>
              </div>
              <div class="d-flex flex-column justify-center align-center">
                <p class="text-center text-body-2 text-sm-body-1">Medium</p>
                <v-btn
                  fab
                  v-bind="prioritybuttonSize"
                  :color="getPriorityColor('2')"
                  @click="prioritySelected = '2'"
                  :disabled="saveInProgress"
                >
                  <v-icon color="white"> mdi-alert-octagon </v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-center flex-column align-center">
                <p class="text-center text-body-2 text-sm-body-1">High</p>
                <v-btn
                  fab
                  v-bind="prioritybuttonSize"
                  :color="getPriorityColor('3')"
                  @click="prioritySelected = '3'"
                  :disabled="saveInProgress"
                >
                  <v-icon color="white"> mdi-alert-octagon </v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <!-- Optional Deadline Setter -->
          <v-row justify="start">
            <v-col
              cols="12"
              class="pa-0 mx-1 ma-md-4 d-flex justify-center justify-md-start"
            >
              <v-switch
                inset
                v-model="deadlineActive"
                label="Set Deadline"
                :disabled="saveInProgress"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="deadlineActive">
            <v-col cols="12" sm="6" class="pa-1 pa-md-3">
              <v-menu
                ref="dateRef"
                v-model="datePickerMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="320px"
                :disabled="saveInProgress"
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
                    :disabled="saveInProgress"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-if="datePickerMenu"
                  v-model="datePicker"
                  full-width
                  @input="datePickerMenu = false"
                  :disabled="saveInProgress"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1 pa-md-3">
              <v-menu
                ref="timePicker"
                v-model="timePickerMenu"
                :close-on-content-click="false"
                :return-value.sync="timePicker"
                transition="scale-transition"
                max-width="290px"
                :disabled="saveInProgress"
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
                    :disabled="saveInProgress"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timePickerMenu"
                  v-model="timePicker"
                  full-width
                  @click:minute="$refs.timePicker.save(timePicker)"
                  format="24hr"
                  :disabled="saveInProgress"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" class="pa-0"
              ><h5 class="text-body-1 text-sm-h6 text-md-h5 text-center">
                {{ deadlineText }}
              </h5>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
      <!-- Form Controls -->
      <v-card-actions id="form-controls">
        <div class="d-flex flex-column flex-grow-1">
          <v-divider></v-divider>
          <div
            class="
              d-flex
              ma-0
              pa-2 pa-sm-3 pa-md-6 pa-lg-8
              justify-space-around
            "
          >
            <v-btn
              class="mx-2"
              fab
              v-bind="buttonSize"
              color="highAlert"
              @click="discardNewNote"
              :disabled="saveInProgress"
            >
              <v-icon color="white"> mdi-close </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="mx-2"
              fab
              color="primary"
              v-bind="buttonSize"
              @click="saveNewNote"
              :loading="saveInProgress"
              :disabled="saveDisabled || saveInProgress"
            >
              <v-icon color="white"> mdi-content-save </v-icon>
            </v-btn>
          </div>
        </div>
      </v-card-actions>
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
    createValidation: [
      (value) => {
        return (value !== null && value !== '') || 'Please enter information'
      },
    ],
    saveInProgress: false,
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
    saveDisabled() {
      return this.newNoteTitle === '' || this.newNoteText === ''
    },
    prioritybuttonSize() {
      const size = {
        xs: 'x-small',
        sm: 'small',
        md: '',
        lg: '',
        xl: '',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
    buttonSize() {
      const size = {
        xs: 'small',
        sm: '',
        md: 'large',
        lg: 'large',
        xl: 'large',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
    fullScreenDialog() {
      const size = {
        xs: 'fullscreen',
        sm: 'fullscreen',
        md: '',
        lg: '',
        xl: '',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
  },
  methods: {
    ...mapActions(['toggleAddNoteDialog', 'addNewNote']),
    discardNewNote() {
      this.toggleAddNoteDialog()
      this.deleteUnsavedNote()
    },
    deleteUnsavedNote() {
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
    async saveNewNote() {
      this.saveInProgress = true
      const newNote = {
        listId: this.dbId,
        noteTitle: this.newNoteTitle,
        noteText: this.newNoteText,
        timestamp: DateTime.now().toUTC().toISO(),
        priority: Number(this.prioritySelected),
        complete: false,
      }
      if (this.deadlineActive) {
        const isoString = `${this.datePicker}T${this.timePicker}`
        const utcIso = DateTime.fromISO(isoString).toUTC().toISO()
        newNote.deadline = utcIso
      } else {
        newNote.deadline = null
      }
      await this.addNewNote({ newNote })
      this.deleteUnsavedNote()
      this.saveInProgress = false
    },
    getPriorityColor(priority) {
      const colors = {
        1: 'secondary',
        2: 'mediumAlert',
        3: 'highAlert',
      }
      return this.prioritySelected === priority ? colors[priority] : 'grey'
    },
  },
}
</script>
