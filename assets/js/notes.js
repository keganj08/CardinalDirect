const notesContainer = document.getElementById("notes");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});


addNoteButton.addEventListener("click", () => addNote());
    
function getNotes(){
    return JSON.parse(localStorage.getItem("CardinalDirect-notes") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("CardinalDirect-notes" , JSON.stringify(notes));
}

function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty note";

    element.addEventListener("change", () =>{
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        if (doDelete){
            deleteNote(id, element);
        }
    });
    return element;
}

function addNote(){
    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();  
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),

        content: date + " at " + time + ": " 
        
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element){
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    notesContainer.removeChild(element);
}