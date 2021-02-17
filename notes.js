const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
  return 'Your notes 👻...'
}

//! ADD A NOTE
const addNote = function (title, body) {
  const notes = loadNotes()
  // console.log(notes)
  // prevent duplicate titles
  //- returns an array of 0 items if no duplicates were found
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title // if there's a matching title that would be a duplicate, return true, and be an item in the array
  })

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
const removeNote = function (title) {
  const notes = loadNotes()
  // console.log(`Let's remove ${title}`)
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title
  })

  if (notes.length !== notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(chalk.inverse.green('Note removed! ') + ' 🔥 🔥 🔥')
  } else {
    console.log(chalk.inverse.red('Note not found...'), '👻 👻 👻')
  }
}

// saveNotes will take in the array
const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    // console.log(`Error: ${error}`);
    // if there's no page to load we'll create an initial array
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}
