const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOption = {
      describe: 'Title of the note',
      demand: true,
      alias: 't'
}

const argv = yargs
   .command('add', 'Add a new note', {
      title: titleOption,
      body: {
         describe: 'Body of the note',
         demand: true,
         alias: 'b'
      },
   })
   .command('read', 'Read a new note', {
      title: titleOption
   })
   .command('list', 'Get all the available notes')
   .command('remove', 'Remove a new note', {
      title: titleOption
   })
   .help()
   .argv;
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
   var note = notes.removeNote(argv.title);
   if (note){
      console.log('Note removed!')
   } else {
      console.log('Sorry, note doesn\'t exist')
   }
} else{
   console.log('Command not recognized')
}