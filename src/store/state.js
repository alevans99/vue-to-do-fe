export default {
  dbId: '',
  notes: [],
  addNoteDialog: false,
  editNoteDialog: false,
  noteToEdit: {},
  sortChoice: 'created',
  areCompletedNotesHidded: false,
  testNotes: [
    {
      noteId: 1,
      listId: 'ListIdTest',
      noteTitle: 'Note Title',
      noteText: `This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text
        This is the text of the note, this is what will appear as text`,

      timestamp: '2022-05-20T08:44:05+0000',
      priority: 1,
      deadline: '2022-05-28T10:38:45+0000',
    },
    {
      noteId: 2,
      listId: 'ListIdTest',
      noteTitle: 'Note Title Two',
      noteText:
        'This is the text of the note, this is what will appear as text',
      timestamp: '2022-05-10T08:44:05+0000',
      priority: 2,
      deadline: '2022-06-14T11:38:45+0000',
    },
  ],
}
