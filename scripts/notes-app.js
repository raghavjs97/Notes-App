'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}



renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id, //this was line whcih will generate the new unique id When ever the page refreshes 
        title: '',
        body: '',
        createdAt: timestamp,
        UpdatedAt: timestamp
    })

     
    saveNotes(notes)
    renderNotes(notes, filters)
    location.assign(`/edit.html#${id}`)
})


document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})


window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
        //1.parse the new data and update notes
        //2.rerender the notes 
    }
})


//1. Add createdAt and updatedAt to a new notes (store Timestamp)
//2. Update updatedAt when someone edits a title or body
//3. Delete all node before testing