const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// console.log(process.argv)
// const command = process.argv[2]

// Customize yargs version
yargs.version('1.1.0')

// add, remove, read, list

//! Create ADD command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    // console.log('Adding a new note!', argv)
    // console.log('Title: ' + argv.title + '\nBody:  ' + argv.body)
    notes.addNote(argv.title, argv.body)
  }
})

//! Create REMOVE command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title to remove',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    // console.log('Removing that there note...🔥...it will bother you no more.')
    notes.removeNote(argv.title)
  }
})

//! Create LIST command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    // console.log('Listing them notes!')
    notes.listNotes()
  }
})

//! Create READ command
yargs.command({
  command: 'read',
  describe: 'Get reading',
  handler() {
    console.log('Yep, reading... reading, reading, reading...')
  }
})

// console.log(yargs.argv)
yargs.parse()

// if (command === 'add') {
//   console.log('Adding note! 🥳')
// } else if (command === 'remove') {
//   console.log('Removing note! 🔥')
// }
