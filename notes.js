const fs = require('fs');

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (err) {
		return [];
	}
}

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	var duplicateNotes = notes.filter((note) => note.title === title )

	if (duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	} else {
		console.log('duplicate note')
	}
};

var getAll = () => {
	return fetchNotes();
};

var getNoteTitle = (title) => {
	console.log('Fectching note', title);
	var notes =  fetchNotes();
	var filteredNote = notes.filter(note => note.title === title)[0];
	return filteredNote;
};

var removeNote = (title) => {
	console.log('Trying to remove notes', title);
	var notes = fetchNotes();
	var filteredNotes = notes.filter(note => note.title !== title);
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length;
};



module.exports = {
	addNote,
	getAll,
	getNoteTitle,
	removeNote
};
