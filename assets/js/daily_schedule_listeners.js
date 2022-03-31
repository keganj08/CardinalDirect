// daily_schedule_listeners.js

function getCurrentDate(){
	//Will need to handle when get to this page from calendar
	let today = new Date();
	let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let date = ("0" + today.getDate()).slice(-2);
	return today.getFullYear() + '-' + month + '-' + date;
}

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
	// Get assignments from database
	fetch('http://127.0.0.1:3000/assignments', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify({"email" : getUserEmail(), "dueDate" : getCurrentDate(), "mode" : 'g'})
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			let i=0;
			for(i=0; i<data.length; i++){
				console.log(data[i]);
				addAssignmentTableRow(data[i].aid, data[i].title, data[i].dueTime, data[i].cid);
			}
		})
		.catch(error => {
			console.log(error);
		});
		
	// fetch To-Do
	// fetch Events (Probably should go first)
});




document.querySelector("#eventlist button").addEventListener('click', e => {
	
});

// Event Handler for Assignment "Add" Button
document.querySelector("#assignmentlist button").addEventListener('click', e => {
	document.getElementById("newassignment").style.display = "block";
	document.querySelector("#newassignment form").id = "new";
});

// Even Handler for Assignment Form Submit
document.querySelector("#newassignment form").addEventListener('submit', e => {
	console.log("Submit Assignment Form");
	e.preventDefault();
	let formElem = e.target;
	if(formElem.id === "new"){
		console.log("Assignment Form Submit - New");
		// save new assignment to database
		let formData = new FormData(formElem);
		let requestObj = Object.fromEntries(formData);
		requestObj.email = getUserEmail();
		requestObj.dueDate = getCurrentDate();
		requestObj.mode = 'a';
		
		console.log(requestObj);
		
		//Send request to server to add a new assignment to assignment database
		fetch('http://127.0.0.1:3000/assignments', {
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
				formElem.style.display = "none";
				let id = data.id.substring(0, data.id.length);
				addAssignmentTableRow(id, requestObj.title, requestObj.dueTime, requestObj.cid);
			})
			.catch(error => {
				console.log(error);
			});
	}
	else{
		console.log("Assignment Form Submit - Update");
		// update assignment in database
		let formData = new FormData(formElem);
		let requestObj = Object.fromEntries(formData);
		requestObj.email = getUserEmail();
		requestObj.id = formElem.id;
		requestObj.dueDate = getCurrentDate();
		requestObj.mode = 'u';
		
		//Send request to server to update an existing assignment in assignment database
		fetch('http://127.0.0.1:3000/assignments', {
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
				formElem.style.display = "none";
				let dataRow = document.getElementById(requestObj.id);
				dataRow.children[0].innerHTML = requestObj.title;
				dataRow.children[1].innerHTML = requestObj.dueTime;
				dataRow.children[2].innerHTML = requestObj.cid;
			})
			.catch(error => {
				console.log(error);
			});
	}
});


document.querySelector("#todolist button").addEventListener('click', e => {
	
});

function addAssignmentTableRow(aid, title, dueTime, cid){
	// Retrieve the table from the DOM
	let assigTable = document.querySelector("#assignmentlist table");
	
	// Create the table row
	let dataRow = document.createElement("tr");
	dataRow.id = aid;
	
	// Create the table data for the given information
	let dataTitle = document.createElement("td");
	dataTitle.innerHTML = title;
	let dataDue = document.createElement("td");
	dataDue.innerHTML = dueTime;
	let dataCid = document.createElement("td");
	dataCid.innerHTML = cid.substr(0, 4) + " " + cid.substr(-3);
	
	let updateTd = document.createElement("td");
	updateTd.innerHTML = "update";
	// Event listener when click update and autofill assignment form
	updateTd.addEventListener('click', e => {
		let dataRow = e.target.parentNode;
		document.getElementById("newassignment").style.display = "block";
		let formElem = document.querySelector("#newassignment form");
		formElem.id = dataRow.id;
		console.log(formElem.children);
		let inputs = formElem.querySelectorAll("input");
		
		let i=0;
		// Fill in the form inputs with the current assignment data
		for(i=0; i<inputs.length; i++){
			inputs[i].value = dataRow.children[i].innerHTML;
		}
	});
	
	let delTd = document.createElement("td");
	delTd.innerHTML = "Delete";
	// Event listener to delete assignment
	delTd.addEventListener('click', e => {
		console.log("Delete Event - Click");
		let dataRow = e.target.parentNode;
		
		//Send request to server to delete an existing assignment from assignment database
		
		fetch('http://127.0.0.1:3000/assignments', {
			method : 'POST',
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify({"id" : dataRow.id, "mode" : 'd'})
			})
			.then(response => {
				if (!response.ok){
					throw new Error('HTTP error: ${response.status}');
				}
				return response.json();
			})
			.then(data => {
				console.log(data.success);
				// Remove the corresponding row from the assignment table
				let assigTable = dataRow.parentNode;
				assigTable.removeChild(dataRow);
				if(assigTable.children.length === 1){ // only tbody is left as a table child
					// Hide the assignment table
					assigTable.style.display = "none";
					
					/* May Need to Convert and Use
					// Add a paragraph saying you have no classes to the DOM
					let noClassP = document.createElement("p");
					noClassP.innerHTML = "You have no current classes";
					document.getElementById("classdiv").appendChild(noClassP);
					*/
				}
			})
			.catch(error => {
				console.log(error);
			});
	});
	
	// Append table data elements to the table row
	dataRow.appendChild(dataTitle);
	dataRow.appendChild(dataDue);
	dataRow.appendChild(dataCid);
	dataRow.appendChild(updateTd);
	dataRow.appendChild(delTd);

	
	// Append table row to the table
	assigTable.appendChild(dataRow);
};

document.getElementById("back-button").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});