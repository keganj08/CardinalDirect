// addclass_listeners.js

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = null;
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
	//return email;
	return "atano@noctrl.edu";
}


document.getElementById("class-search").addEventListener("submit", e => {
	e.preventDefault();
	let classTableSection = document.getElementById("result_section");
	let classTable = classTableSection.children[0];
	let i=0;
	console.log(classTable.children);
	let length = classTable.children.length;
	for(i=1; i<length; i++){
		classTable.removeChild(classTable.children[1]);
	}
	classTableSection.style.display = "none";
	
	let formElem = e.target;
	
	let formData = new FormData(formElem);
	let formObj = Object.fromEntries(formData);
	requestObj = {
		"searchParams" : formObj, //JSON.stringify(formObj),
		"mode" : 's'
	};
	console.log(requestObj);
		
	//Send request to server to search course database
	fetch('http://127.0.0.1:3000/classes', {
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
			for(let i=0; i<data.length; i++){
				console.log(data[i]);
				rec = data[i];
				createClassTableRow(rec.cid, rec.name, rec.startDate, rec.endDate, rec.dow, rec.startTime, rec.endTime, rec.building, rec.roomNum, rec.fnamefirst, rec.fnamelast)
			}
		})
		.catch(error => {
			console.log(error);
		});
		
});


// STILL NEED TO HANDLE MULTIPLE FACULTY MEMBERS & ADJUST HOW DATA APPEAR IN TABLE (ESP. DATES)
function createClassTableRow(cid, name, startDate, endDate, dow, startTime, endTime, building, roomNum, fnamefirst, fnamelast){
	let classTableSection = document.getElementById("result_section");
	let classTable = classTableSection.children[0];
	
	// Create the table row
	let dataRow = document.createElement("tr");
	
	// Create the table data for the given information
	let dataId = document.createElement("td");
	dataId.innerHTML = cid;
	let dataName = document.createElement("td");
	dataName.innerHTML = name;
	let dataDate = document.createElement("td");
	dataDate.innerHTML = startDate.substr(0,10) + "-" + endDate.substr(0,10);
	let dataDow = document.createElement("td");
	dataDow.innerHTML = dow;
	let dataTime = document.createElement("td");
	dataTime.innerHTML = startTime + "-" + endTime;
	let dataLoc = document.createElement("td");
	dataLoc.innerHTML = building + ", " + roomNum;
	let dataFaculty = document.createElement("td");
	dataFaculty.innerHTML = fnamefirst + ", " + fnamelast;
	
	// Append table data elements to the table row
	dataRow.appendChild(dataId);
	dataRow.appendChild(dataName);
	dataRow.appendChild(dataDate);
	dataRow.appendChild(dataDow);
	dataRow.appendChild(dataTime);
	dataRow.appendChild(dataLoc);
	dataRow.appendChild(dataFaculty);
	
	// Append table row to the table
	classTable.appendChild(dataRow);
	
	// Make the table visible
	classTableSection.style.display = "block";

};




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


//"Back" button
document.getElementById("back-button").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'class_view.html' + user;
});

