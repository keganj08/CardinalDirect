// assignment_listeners.js

// Event Handler for Assignment "Add" Button
document.querySelector("#assignment-add-btn").addEventListener('click', e => {
	// Show new assignment form div
	document.getElementById("newassignment").style.display = "block";
	// Hide add Button
	e.target.style.display = "none";
	// Set id of new assignment form
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
				// Hide new assignment form div
				document.getElementById("newassignment").style.display = "none";
				// Show the assignment table
				document.querySelector("#assignmentlist table").style.display = "block";
				// Make sure there is no message saying no assignments due
				document.getElementById("assignment-messages").innerHTML = "";
				// Show the assignment add button
				document.querySelector("#assignment-add-btn").style.display = "block";
				
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
				// Hide new assignment form div
				document.getElementById("newassignment").style.display = "none";
				// Show the assignment add button
				document.querySelector("#assignment-add-btn").style.display = "block";
				// Update the row in the table with the new values
				let dataRow = document.getElementById(requestObj.id);
				dataRow.children[0].innerHTML = requestObj.title;
				dataRow.children[1].innerHTML = requestObj.dueTime;
				dataRow.children[2].innerHTML = courseIds.getSimpleFromCid(requestObj.cid);
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
	dataCid.innerHTML = courseIds.getSimpleFromCid(cid);
	
	let updateTd = document.createElement("td");
	updateTd.classList.add('edit-icon');
	// Event listener when click update and autofill assignment form
	updateTd.addEventListener('click', e => {
		let dataRow = e.target.parentNode;
		// Show the new assignment form div
		document.getElementById("newassignment").style.display = "block";
		// Hide the add assignment button 
		document.getElementById("assignment-add-btn").style.display = "none";
		let formElem = document.querySelector("#newassignment form");
		formElem.id = dataRow.id;
		
		/* Fill in the form inputs with the current assignment data*/
		// Fill in the title
		formElem.querySelector("#title").value = dataRow.children[0].innerHTML;
		
		// Fill in the due time
		let dueHrValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
		let dueMinValues = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
		let dueAmPmValues = ["AM", "PM"];
		let time_ampm = dataRow.children[1].innerHTML.split(" "); // e.g., ["12:00", "AM"]
		let hr_min = time_ampm[0].split(":"); //e.g., ["12", "00"]
		formElem.querySelector("#duehr").selectedIndex = dueHrValues.indexOf(hr_min[0]);
		formElem.querySelector("#duemin").selectedIndex = dueMinValues.indexOf(hr_min[1]);
		formElem.querySelector("#dueampm").selectedIndex = dueAmPmValues.indexOf(time_ampm[1]);
		
		// Fill in the associated class
		let courseIdx = courseIds.getSimpleIdx(dataRow.children[2].innerHTML);
		formElem.querySelector("#cid").selectedIndex = courseIdx;
	});
	
	let delTd = document.createElement("td");
	delTd.classList.add('trash-icon');
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
					// Show a message saying there are no assignments due
					document.getElementById("assignment-messages").innerHTML = "No Assignments Due";
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
