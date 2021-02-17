const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return 'Your notes 👻...'
}

//! ADD A NOTE
const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'), '🤗')
  } else {
    console.log(chalk.red.inverse('Note title already taken!'), '☠️')
  }
}

//! REMOVE A NOTE
const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length !== notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(chalk.inverse.green('Note removed! ') + ' 🔥 🔥 🔥')
  } else {
    console.log(chalk.inverse.red('Note not found...'), '👻 👻 👻')
  }
}

//! LIST NOTES
const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.underline.green('Your Notes:'))
  notes.forEach((note) => console.log(`${note.title}`))
}

//! Utility Functions
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
    // if there's no page to load we'll create an initial array
    return []
  }
}

//! Exports
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
}
