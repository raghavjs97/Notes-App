'use strict'
let data
//below data variable is the global variable 
const processData = () => {
    data = '124224353'
}

processData()
console.log(data)

const getSavedNotes = () => {
    
const notesJSON = localStorage.getItem('notes')

try {
    return notesJSON ? JSON.parse(notesJSON) : []
} catch (e) {
    return []   

}


}


//Save the notes to local storage 
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}


//remove a note from the list 
const removeNote = (id) =>  {
    const noteIndex = notes.findIndex((note) => note.id === id )//this get called for one time for each item in the array

    if (noteIndex > -1) {  //this means we found a match and we remove it with the note.splice
        notes.splice(noteIndex, 1)  //here we are trying to remove this by note index, we remove 1 item
    }
}


//2.Generating the DOM structure for a note
const generateNoteDOM = (note) => { 

    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    //set up the note title text
    if (note.title.length > 0) {
    textEl.textContent = note.title
    }   else {
    textEl.textContent = 'Unnamed note'
    }

    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    
    //setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //setup the status message 
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

//sort your notes by one of three ways 
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            }else if (a.updatedAt < b.updatedAt){
                return 1
            }else {
                return 0
            }

        })
    }else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else {
                return 0
            }
        })
    }else {
        return notes
    }
}


//3.render application notes 
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    //in the below line innerHTML allows us to set a new value 
    notesEl.innerHTML = ''
    //console.log(filteredNotes)

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
             const noteEl = generateNoteDOM(note)
             notesEl.appendChild(noteEl)
         })
    }else{
        const emptyMessage = document.createElement('p')    
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
    
}


//Generate the last edited message

const generateLastEdited = (timestamp) => {
     return `Last edited ${moment(timestamp).fromNow()}`
}
