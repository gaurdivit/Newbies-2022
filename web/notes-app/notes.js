const fs = require('fs');
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter((note) =>
    //     note.title === title
    // )

    const duplicateNote = notes.find((note) =>
        note.title === title
    )

    // if (duplicateNotes.length === 0) {
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    }
    else {
        console.log('Note title taken!')
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) =>
        note.title !== title
    )

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {

    console.log(chalk.inverse('Your notes'));

    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }
    else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}