// assignment_listeners.js

// Event Handler for Assignment "Add" Button
document.querySelector("#assignment-add-btn").addEventListener('click', e => {
	// Show new assignment form div
	document.getElementById("newassignment").classList.remove("display-none");
	// Hide add Button
	e.target.parentNode.classList.add("display-none");
	// Set id of new assignment form
	document.querySelector("#newassignment form").id = "new";
});

// Event Handler for Assignment Form Submit
document.querySelector("#newassignment form").addEventListener('submit', e => {
	e.preventDefault(); // Prevents default form submit behavior
	let formElem = e.target;
	if(formElem.id === "new"){
		// save new assignment to database
		let formData = new FormData(formElem);
		let formDataObj = Object.fromEntries(formData);
		let requestObj = {
			"title" : formDataObj.title,
			"dueTime" : ("0" + formDataObj.duehr).slice(-2) + ":" + formDataObj.duemin + " " + formDataObj.dueampm,
			"email" : getUserEmail(),
			"cid" : formDataObj.cid,
			"dueDate" : getCurrentDate(),
			"mode" : 'a'
		};
		
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
				// Reset and clear out the form's contents
				formElem.reset();
				
				// Hide new assignment form div
				document.getElementById("newassignment").classList.add("display-none");
				// Make sure there is no message saying no assignments due
				document.getElementById("assignment-messages").innerHTML = "";
				// Show the assignment add button
				document.querySelector("#assignment-add-btn").parentNode.classList.remove("display-none");
				
				let id = "aid" + data.id.substring(0, data.id.length);
				
				// Get index within chronological order of this assignment
				let insertIdx = assignments.addDueTime(id, requestObj.dueTime);
				
				// Add a row for this assignment in the assignment table
				addAssignmentCard(insertIdx, id, requestObj.title, requestObj.dueTime, requestObj.cid);
			})
			.catch(error => {
				console.log(error);
			});
	}
	else{
		// update assignment in database
		let formData = new FormData(formElem);
		let formDataObj = Object.fromEntries(formData);
		let requestObj = {
			"id" : formElem.id.substring(3),
			"title" : formDataObj.title,
			"dueTime" : ("0" + formDataObj.duehr).slice(-2) + ":" + formDataObj.duemin + " " + formDataObj.dueampm,
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
				// Reset and clear out the form's contents
				formElem.reset();
				
				// Hide new assignment form div
				document.getElementById("newassignment").classList.add("display-none");
				// Show the assignment add button
				document.querySelector("#assignment-add-btn").parentNode.classList.remove("display-none");
				
				// Get the new index of the card for this assignment (this will only be different
				// if the due time changed
				let newInsertIdx = assignments.updateDueTime("aid" + requestObj.id, requestObj.dueTime);
				
				// Delete the card in the assignment card container with the old values
				let assigCard = document.getElementById("aid" + requestObj.id);
				let assigContainer = assigCard.parentNode;
				assigContainer.removeChild(assigCard);
				
				// Add a new card for this assignment in the assignment card container
				addAssignmentCard(newInsertIdx, "aid" + requestObj.id, requestObj.title, requestObj.dueTime, requestObj.cid); 
			})
			.catch(error => {
				console.log(error);
			});
	}
});


// Add assignment to the assignment container
function addAssignmentCard(insertidx, aid, title, dueTime, cid){
	// Retrieve the assignment card container from the DOM
	let assigContainer = document.querySelector("#assignmentlist");
	
	// Create the assignment card
	let assigCard = document.createElement("div");
	assigCard.id = aid;
	assigCard.classList.add("card", "card-width");
	
	// Create the assignment card head using the given title
	let assigTitle = document.createElement("div");
	assigTitle.innerHTML = courseIds.getSimpleFromCid(cid) + ": " + title;
	assigTitle.classList.add("card-header");
	// Create the assignment card body using the given information
	let assigBody = document.createElement("div");
	assigBody.classList.add("card-body");
	let assigDue = document.createElement("p");
	assigDue.innerHTML = "Due: " + dueTime;
	assigDue.classList.add("card-text");
	
	let updateBtn = document.createElement("button");
	updateBtn.classList.add('edit-icon');
	// Event listener when click update and autofill assignment form
	updateBtn.addEventListener('click', e => {
		let thisAssigBody = e.target.parentNode;
		let thisAssigCard = thisAssigBody.parentNode;
		// Show the new assignment form div
		document.getElementById("newassignment").classList.remove("display-none");
		// Hide the add assignment button 
		document.getElementById("assignment-add-btn").parentNode.classList.add("display-none");
		let formElem = document.querySelector("#newassignment form");
		formElem.id = thisAssigCard.id;
		
		// Fill in the form inputs with the current assignment data
		let cid_title = thisAssigCard.children[0].innerHTML.split(": ");
		
		// Fill in the title
		formElem.querySelector("#title").value = cid_title[1];
		
		// Fill in the due time
		let dueHrValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
		let dueMinValues = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
		let dueAmPmValues = ["AM", "PM"];
		// Get the time from the assignment card. Account for "Due: " in the string
		let time_ampm = thisAssigBody.children[0].innerHTML.substring(5).split(" "); // e.g., ["12:00", "AM"]
		let hr_min = time_ampm[0].split(":"); //e.g., ["12", "00"]
		formElem.querySelector("#duehr").selectedIndex = dueHrValues.indexOf("" + parseInt(hr_min[0]));
		formElem.querySelector("#duemin").selectedIndex = dueMinValues.indexOf(hr_min[1]);
		formElem.querySelector("#dueampm").selectedIndex = dueAmPmValues.indexOf(time_ampm[1]);
		
		// Fill in the associated class
		let courseIdx = courseIds.getSimpleIdx(cid_title[0]);
		formElem.querySelector("#cid").selectedIndex = courseIdx;
	});
	
	let delBtn = document.createElement("button");
	delBtn.classList.add('trash-icon');
	// Event listener to delete assignment
	delBtn.addEventListener('click', e => {
		let thisAssigBody = e.target.parentNode;
		let thisAssigCard = thisAssigBody.parentNode;
		
		//Send request to server to delete an existing assignment from assignment database
		
		fetch('http://127.0.0.1:3000/assignments', {
			method : 'POST',
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify({"id" : thisAssigCard.id.substring(3), "mode" : 'd'})
			})
			.then(response => {
				if (!response.ok){
					throw new Error('HTTP error: ${response.status}');
				}
				return response.json();
			})
			.then(data => {
				// Remove the assignment from the assignment object
				assignments.removeDueTime(thisAssigCard.id);
				// Remove the corresponding card from the assignment card container
				let assigContainer = document.getElementById("assignmentlist");
				assigContainer.removeChild(thisAssigCard);
				if(assigContainer.children.length === 0){ // the assignment card container is empty
					// Show a message saying there are no assignments due
					document.getElementById("assignment-messages").innerHTML = "No Assignments Due";
				}
			})
			.catch(error => {
				console.log(error);
			});
	});
	
	// Append card elements to the assignment card
	assigBody.appendChild(assigDue);
	assigBody.appendChild(updateBtn);
	assigBody.appendChild(delBtn);
	assigCard.appendChild(assigTitle);
	assigCard.appendChild(assigBody);
	
	// Make the assignment card a child of the assignment card container
	// If there assignment cards in the assignment card container, append assignment row to the table
	if(assigContainer.children.length === 0){
		assigContainer.appendChild(assigCard);
	}
	else{ //Otherwise, add the assignment card at the specified index given by insertidx 
		assigContainer.insertBefore(assigCard, assigContainer.children[insertidx]);
	}
}