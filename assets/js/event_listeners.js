// event_listeners.js

// Event Handler for Event "Add" Button
document.querySelector("#event-add-btn").addEventListener('click', e => {
	document.getElementById("newevent").style.display = "block";
	document.querySelector("#newevent form").id = "new";
});

// Event Handler for Event Form Submit
document.querySelector("#newevent form").addEventListener('submit', e => {
	console.log("Submit Event Form");
	e.preventDefault();
	let formElem = e.target;
	if(formElem.id === "new"){
		console.log("Event Form Submit - New");
		// save new event to database
		let formData = new FormData(formElem);
		let formDataObj = Object.fromEntries(formData);
		let requestObj = {
			"title" : formDataObj.title,
			"start" : "" + formDataObj.starthr + ":" + formDataObj.startmin + " " + formDataObj.startampm,
			"end" : "" + formDataObj.endhr + ":" + formDataObj.endmin + " " + formDataObj.endampm,
			"building" : formDataObj.building,
			"roomNum" : formDataObj.roomNum,
			"email" : getUserEmail(),
			"meetDate" : getCurrentDate(),
			"mode" : 'a'
		};
		
		console.log(requestObj);
		
		//Send request to server to add a new meeting to meeting database
		fetch('http://127.0.0.1:3000/meetings', {
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
				document.getElementById("eventlist").style.display = "block";
				let id = data.id.substring(0, data.id.length);
				addEventTableRow(id, requestObj.title, requestObj.start, requestObj.end, requestObj.building, requestObj.roomNum, 'm');
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
			"start" : "" + formDataObj.starthr + ":" + formDataObj.startmin + " " + formDataObj.startampm,
			"end" : "" + formDataObj.endhr + ":" + formDataObj.endmin + " " + formDataObj.endampm,
			"building" : formDataObj.building,
			"roomNum" : formDataObj.roomNum,
			"email" : getUserEmail(),
			"meetDate" : getCurrentDate(),
			"mode" : 'u'
		};		
		
		//Send request to server to update an existing assignment in assignment database
		fetch('http://127.0.0.1:3000/meetings', {
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
				dataRow.children[1].innerHTML = requestObj.start + "-" + requestObj.end;
				dataRow.children[2].innerHTML = requestObj.building;
				dataRow.children[3].innerHTML = requestObj.roomNum;
			})
			.catch(error => {
				console.log(error);
			});
	}
});

// Add event to the event table
function addEventTableRow(mid, title, start, end, building, roomNum, eventType){
	// Retrieve the table from the DOM
	let eventTable = document.querySelector("#eventlist table");
	
	// Create the table row
	let dataRow = document.createElement("tr");
	dataRow.id = mid;
	
	// Create the table data for the given information
	let dataTitle = document.createElement("td");
	dataTitle.innerHTML = title;
	let dataTime = document.createElement("td");
	dataTime.innerHTML = start + "-" + end;
	let dataBuilding = document.createElement("td");
	dataBuilding.innerHTML = building;
	let dataRoom = document.createElement("td");
	dataRoom.innerHTML = roomNum;
	
	// Append table data elements to the table row
	dataRow.appendChild(dataTitle);
	dataRow.appendChild(dataTime);
	dataRow.appendChild(dataBuilding);
	dataRow.appendChild(dataRoom);
	
	// Allow for updating and deleting non-class events (classes cannot be updated here)
	if(eventType === 'm'){
		let updateTd = document.createElement("td");
		updateTd.innerHTML = "Edit";
		// Event listener when click update and autofill assignment form
		updateTd.addEventListener('click', e => {
			console.log("Click Update Event");
			let dataRow = e.target.parentNode;
			document.getElementById("newevent").style.display = "block";
			let formElem = document.querySelector("#newevent form");
			formElem.id = dataRow.id;
			//console.log(formElem.children);
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
			
			fetch('http://127.0.0.1:3000/meetings', {
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
					let eventTable = dataRow.parentNode;
					eventTable.removeChild(dataRow);
					if(eventTable.children.length === 1){ // only tbody is left as a table child
						// Hide the assignment table
						eventTable.style.display = "none";
						
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
		
		dataRow.appendChild(updateTd);
		dataRow.appendChild(delTd);
	}
	
	// Append table row to the table
	eventTable.appendChild(dataRow);
};