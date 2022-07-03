import { DateTime } from 'luxon'

export default {
  incompleteNotes(state) {
    return state.notes.filter((note) => {
      return !note.complete
    })
  },
  completeNotes(state) {
    return state.notes.filter((note) => {
      return note.complete
    })
  },
  notesToDisplay(state) {
    let currentNotes = []
    //Option to hide completed notes
    if (state.areCompletedNotesHidded) {
      currentNotes = [
        ...state.notes.filter((note) => {
          return !note.complete
        }),
      ]
    } else {
      currentNotes = [...state.notes]
    }

    //Apply sort options
    switch (state.sortChoice) {
      case 'priority':
        currentNotes.sort((a, b) => {
          return b.priority - a.priority
        })
        break
      case 'deadline':
        currentNotes.sort((a, b) => {
          const aDeadline = DateTime.fromISO(a.deadline)
          const bDeadline = DateTime.fromISO(b.deadline)
          return aDeadline < bDeadline ? -1 : aDeadline > bDeadline ? 1 : 0
        })
        break
      default:
        currentNotes.sort((a, b) => {
          const aDateTime = DateTime.fromISO(a.timestamp)
          const bDateTime = DateTime.fromISO(b.timestamp)
          return aDateTime > bDateTime ? -1 : aDateTime < bDateTime ? 1 : 0
        })
    }
    return currentNotes
  },
}
