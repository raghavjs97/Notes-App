//1. Add a DOM element between the title and body inputs (empty span)
//2. Set text Values: Last edited 4 hr ago
//3. Update value on title/body/Storage change
'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const gotohomeElement = document.querySelector('#goto')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1) //getting from the first char upto last char
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeElement.addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

gotohomeElement.addEventListener('click', (e) => {
    location.assign('/index.html')
})


//storage event fires when any of the data in the local storage changes 
//this will allow us to update what the user sees 
//this storage will fire for the tab 2 and for the tab 1 it will not fire 


window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
    notes = JSON.parse(e.newValue)
    note = notes.find((note) => note.id === noteId)
    
    if (!note) {
        location.assign('/index.html')
    }
    
    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)

    }
})