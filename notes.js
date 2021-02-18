const fs = require('fs')
const chalk = require('chalk')

//! READ A NOTE
const readNote = (title) => {
  const notes = loadNotes()
  const fullNote = notes.find((note) => note.title === title)
  if (fullNote) {
    console.log(chalk.blue.bold(fullNote.title))
    console.log(fullNote.body)
  } else {
    console.log(chalk.red.inverse('404: Note not found... 🤔'))
  }
}

//! ADD A NOTE
const addNote = (title, body) => {
  const notes = loadNotes()
  // filter will return an array - goes through all items
  // const duplicateNotes = notes.filter((note) => note.title === title)
  //! .find() will simply return the first match it finds or undefined - goes until first item found
  const duplicateNote = notes.find((note) => note.title === title)

  // console.log(duplicateNote)
  // console.log(title)
  // console.log(body)

  // see debug data in dev tools
  // debugger

  // if (duplicateNotes.length === 0) {
  if (!duplicateNote) {
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
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
