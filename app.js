const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
var command = argv._[0];


if (command === 'add') {

   var note = notes.addNote(argv.title, argv.body);
   if (note) {
      console.log('Note created!');
      console.log('Title of the note:',argv.title);
      console.log('Body of the note:',argv.body);
   } else {
      console.log('Note was not created because it was a duplicate')
   }

} else if (command === 'list') {
   var allNotes = notes.getAll();
   if (allNotes) {
      console.log('There are ' + allNotes.length + ' note(s)');
      allNotes.forEach((note, i) => {
         console.log('------------------------')
         console.log('Note', i + 1)
         console.log('----')
         console.log('Title: ' + note.title)
         console.log('Body: ' + note.body)
         
      })
   }
} else if (command === 'read') {
   var note = notes.getNoteTitle(argv.title);
   if (note) {
      console.log('Body: ', note.body);
   } else {
      console.log('note was not found!')
   }
} else if (command === 'remove') {
   notes.removeNote(argv.title);
} else{
   console.log('Command not recognized')
}