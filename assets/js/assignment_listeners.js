// assignment_listeners.js

// Event Handler for Assignment "Add" Button
document.querySelector("#assignment-add-btn").addEventListener('click', e => {
	document.getElementById("newassignment").style.display = "block";
	document.querySelector("#newassignment form").id = "new";
});

// Event Handler for Assignment Form Submit
document.querySelector("#newassignment form").addEventListener('submit', e => {
	console.log("Submit Assignment Form");
	e.preventDefault();
	let formElem = e.target;
	if(formElem.id === "new"){
		console.log("Assignment Form Submit - New");
		// save new assignment to database
		let formData = new FormData(formElem);
		let formDataObj = Object.fromEntries(formData);
		let requestObj = {
			"title" : formDataObj.title,
			"dueTime" : "" + formDataObj.duehr + ":" + formDataObj.duemin + " " + formDataObj.dueampm,
			"email" : getUserEmail(),
			"cid" : formDataObj.cid,
			"dueDate" : getCurrentDate(),
			"mode" : 'a'
		};
		
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
				document.getElementById("assignmentlist").style.display = "block";
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
		let formDataObj = Object.fromEntries(formData);
		let requestObj = {
			"id" : formElem.id,
			"title" : formDataObj.title,
			"dueTime" : "" + formDataObj.duehr + ":" + formDataObj.duemin + " " + formDataObj.dueampm,
			"email" : getUserEmail(),
			"cid" : formDataObj.cid,
			"dueDate" : getCurrentDate(),
			"mode" : 'u'
		};		
		
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

// Add assignment to the assignment table
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
	dataCid.innerHTML = cid;//cid.substr(0, 4) + " " + cid.substr(-3);
	
	let updateTd = document.createElement("td");
	updateTd.innerHTML = "Edit";
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
					assigTable.parentNode.style.display = "none";
					
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
