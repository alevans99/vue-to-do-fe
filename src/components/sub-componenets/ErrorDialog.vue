<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-title class="text-h5"> Error </v-card-title>

      <v-card-text class="text-body-1">
        {{ errorText }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false"> Ok </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddNoteDialog',
  props: [],
  data: () => ({}),
  computed: {
    ...mapState(['errorText', 'errorDialog']),
    dialog: {
      get() {
        return this.errorDialog
      },
      set(value) {
        this.toggleErrorDialog({ errorDialog: value })
      },
    },
  },
  methods: {
    ...mapActions(['toggleErrorDialog']),
  },
}
</script>
