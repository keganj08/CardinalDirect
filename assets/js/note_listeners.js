const notesContainer = document.getElementById("notes");
const addNoteButton = notesContainer.querySelector("#add-note_btn");

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = "";
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
	return email;
}

document.addEventListener('DOMContentLoaded', e => {
	// Get notes from database
	fetch('http://127.0.0.1:3000/notes', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify({"email" : getUserEmail(), "mode" : 'g'})
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			let i=0;
			for(i=0; i<data.length; i++){
				createNoteElement(data[i].nid, data[i].title, data[i].text);
			}
		})
		.catch(error => {
			console.log(error);
		});
});

addNoteButton.addEventListener('click', () => createNoteElement(null, "", ""));


function createNoteElement(id, title, content){
	//console.log("In Create Note Element");
	let notediv = document.createElement("div");
	if(id === null){
		notediv.id = "new";
	}
	else{
		notediv.id = id;
	}
	notediv.classList.add("note");
	
	let noteform = document.createElement("form");
	notediv.appendChild(noteform);
	
	let notetitle = document.createElement("input");
	notetitle.name = "title";
	notetitle.type = "text";
	notetitle.value = title;
	noteform.appendChild(notetitle);
	
	let notetext = document.createElement("textarea");
	notetext.name = "text";
	notetext.value = content;
	noteform.appendChild(notetext);
	
	let savebtn = document.createElement("button");
	savebtn.innerHTML = "Save";
	savebtn.type = "submit";
	noteform.appendChild(savebtn);
	noteform.addEventListener('submit', e => {
		//console.log("Save Button - Submit");
		e.preventDefault();
		let formElem = e.target;
		let divElem = formElem.parentElement;
		let noteid = divElem.id;
		if(noteid === "new"){
			//console.log("Save Button - Submit - New");
			// save new note to database
			let formData = new FormData(formElem);
			let requestObj = Object.fromEntries(formData);
			requestObj.email = getUserEmail();
			requestObj.mode = 'a';
			
			//console.log(requestObj);
			
			//Send request to server to add a new note to note database
			fetch('http://127.0.0.1:3000/notes', {
				method : 'POST',
				headers: {'Content-Type': 'application/json'},
				body : JSON.stringify(requestObj)
				})
				.then(response => {
					if (!response.ok){
						throw new Error('HTTP error: ${response.status}');
					}
					return response.json();
				})
				.then(data => {
					let id = data.id.substring(0, data.id.length);
					noteDivElem = document.getElementById("new");
					noteDivElem.id = id;
				})
				.catch(error => {
					console.log(error);
				});
		}
		else{
			console.log("Save Button - Submit - Update");
			// update note in database
			console.log(formElem);
			let formData = new FormData(formElem);
			let requestObj = Object.fromEntries(formData);
			requestObj.email = getUserEmail();
			requestObj.id = noteid;
			requestObj.mode = 'u';
			
			//Send request to server to update an existing note in note database
			fetch('http://127.0.0.1:3000/notes', {
				method : 'POST',
				headers: {'Content-Type': 'application/json'},
				body : JSON.stringify(requestObj)
				})
				.then(response => {
					if (!response.ok){
						throw new Error('HTTP error: ${response.status}');
					}
					return response;
				})
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.log(error);
				});
		}
	});
	
	let delbtn = document.createElement("button");
	delbtn.innerHTML = "Delete";
	delbtn.type = "button";
	noteform.appendChild(delbtn);
	delbtn.addEventListener('click', function(e){
		//console.log("Delete Button - Click");
		let formElem = this.parentElement;
		let divElem = formElem.parentElement;
		let noteid = divElem.id;
		if(noteid !== "new"){	
			//Send request to server to delete an existing note in note database
			
			fetch('http://127.0.0.1:3000/notes', {
				method : 'POST',
				headers: {'Content-Type': 'application/json'},
				body : JSON.stringify({"id" : noteid, "mode" : 'd'})
				})
				.then(response => {
					if (!response.ok){
						throw new Error('HTTP error: ${response.status}');
					}
					return response.json();
				})
				.then(data => {
					console.log(data.success);
					// Deletes the note div
					divElem.remove();
				})
				.catch(error => {
					console.log(error);
				});
			
		}
		else{
			divElem.remove();
		}
	});
	
	notesContainer.insertBefore(notediv, addNoteButton);
	
	//return notediv;
}
//"Logout" button
document.getElementById("logout").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'login.html';
});

document.getElementById("back-button").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});


//const notesContainer = document.getElementById("notes");
//const addNoteButton = notesContainer.querySelector(".add-note");

/*
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});
*/

/*
function getNotes(){
    //return JSON.parse(localStorage.getItem("CardinalDirect-notes") || "[]");
	return [];
}
*/

/*
function saveNotes(notes){
    //localStorage.setItem("CardinalDirect-notes" , JSON.stringify(notes));
	return;
}
*/


//addNoteButton.addEventListener("click", () => addNote());
    

/*
function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    //element.value = content;
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
*/

/*
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
*/