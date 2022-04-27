// note_listeners.js

const notesContainer = document.getElementById("notes-container");
const notes = document.getElementById("notes");
const addNoteButton = notesContainer.querySelector("#add-note_btn");

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = "";
	if(idx !== -1){
		email = url.substring(idx + 6) + "@noctrl.edu";
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
				createNoteCard("nid" + data[i].nid, data[i].title, data[i].text);
			}
		})
		.catch(error => {
			console.log(error);
		});
});

document.querySelector("#noteform form").addEventListener("submit", e => {
	e.preventDefault();
	let formElem = e.target;
	let divElem = formElem.parentElement;
	let noteid = formElem.id;
	
	// Get note data from form
	let formData = new FormData(formElem);
	let requestObj = Object.fromEntries(formData);
	requestObj.email = getUserEmail();
	
	// If the id is "new", add a new note to the database
	if(noteid === "new"){
		requestObj.mode = 'a';
				
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
				let id = "nid" + data.id.substring(0, data.id.length);
				// Hide the update note form
				divElem.classList.toggle("display-none");
				// Create a note card for this note
				createNoteCard(id, requestObj.title, requestObj.text);
				// Show all of the notes
				notesContainer.classList.toggle("display-none");
				// Reset and clear out the form's contents
				formElem.reset();
			})
			.catch(error => {
				console.log(error);
			});
	}
	// Update a currently existing note in the note database
	else{
		requestObj.id = noteid.substring(3); // Remove "nid" from note id
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
				// Hide the update note form
				divElem.classList.toggle("display-none");
				// Update the note's title and content
				updateNoteCard("nid" + requestObj.id, requestObj.title, requestObj.text);
				// Show all of the notes
				notesContainer.classList.toggle("display-none");
				// Reset and clear out the form's contents
				formElem.reset();
			})
			.catch(error => {
				console.log(error);
			});
	}
});

// Show an empty note form upon clicking the add note button
addNoteButton.addEventListener('click', () => {
	// Show the note form div
	document.getElementById("noteform").classList.toggle("display-none");
	
	// Hide the notes
	notesContainer.classList.toggle("display-none");
	
	// Set the note form id to new
	let formElem = document.querySelector("#noteform form");
	formElem.id = "new";
});

// Add note card to the note container
function createNoteCard(nid, title, content){
	// Create the note card
	let noteCard = document.createElement("div");
	noteCard.id = nid;
	noteCard.classList.add("card");
	
	// Create the note card head using the given title
	let noteTitle = document.createElement("div");
	noteTitle.innerHTML = title;
	noteTitle.classList.add("card-header");
	// Create the assignment card body using the given information
	let noteBody = document.createElement("div");
	noteBody.classList.add("card-body");
	let noteContent = document.createElement("p");
	noteContent.innerHTML = content;
	noteContent.classList.add("card-text");
	
	let updateBtn = document.createElement("button");
	updateBtn.classList.add('edit-icon');
	// Event listener when click update and autofill note form
	updateBtn.addEventListener('click', e => {
		let thisNoteBody = e.target.parentNode;
		let thisNoteCard = thisNoteBody.parentNode;
		
		// Show the note form div
		document.getElementById("noteform").classList.toggle("display-none");
		
		// Hide the notes
		notesContainer.classList.toggle("display-none");
		
		// Autofill the note data into the form
		let formElem = document.querySelector("#noteform form");
		formElem.id = thisNoteCard.id;
		
		// Fill in the note title
		formElem.querySelector("#title").value = thisNoteCard.children[0].innerHTML;
		
		// Fill in the note content
		formElem.querySelector("#text").value = thisNoteBody.children[0].innerHTML;
	});
	
	let delBtn = document.createElement("button");
	delBtn.classList.add('trash-icon');
	// Event listener to delete note
	delBtn.addEventListener('click', e => {
		let thisNoteBody = e.target.parentNode;
		let thisNoteCard = thisNoteBody.parentNode;
		
		//Send request to server to delete an existing note from note database
		// id must account for the "nid" in the id
		fetch('http://127.0.0.1:3000/notes', {
			method : 'POST',
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify({"id" : thisNoteCard.id.substring(3), "mode" : 'd'})
			})
			.then(response => {
				if (!response.ok){
					throw new Error('HTTP error: ${response.status}');
				}
				return response.json();
			})
			.then(data => {
				// Remove the note card from the note card container
				thisNoteCard.remove();
			})
			.catch(error => {
				console.log(error);
			});
	});
	
	// Append card elements to the note card
	noteBody.appendChild(noteContent);
	noteBody.appendChild(updateBtn);
	noteBody.appendChild(delBtn);
	noteCard.appendChild(noteTitle);
	noteCard.appendChild(noteBody);
	
	// Add the note div to the notes container before the add note button
	notes.insertBefore(noteCard, addNoteButton);
};

// Update an existing note card with id given using the title and content provided
function updateNoteCard(id, title, content){
	let noteCard = notes.querySelector("#" + id);
	let noteBody = noteCard.children[1];
	noteCard.children[0].innerHTML = title;
	noteBody.children[0].innerHTML = content;
}

//"Logout" button
document.getElementById("logout").addEventListener('click', e => {window.location.href = 'login.html';});

// When click on Back button, return to the scheduler landing page while keeping the user logged in
document.getElementById("back-button").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substring(idx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});