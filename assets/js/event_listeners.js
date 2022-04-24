// event_listeners.js

// Event Handler for Event "Add" Button
document.querySelector("#event-add-btn").addEventListener('click', e => {
	// Show the new event form div
	document.getElementById("newevent").style.display = "block";
	// Hide the add button
	e.target.style.display = "none";
	// Set the new event form's id
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
			"start" : "" + ("0" + formDataObj.starthr).slice(-2) + ":" + formDataObj.startmin + " " + formDataObj.startampm,
			"end" : "" + ("0" + formDataObj.endhr).slice(-2) + ":" + formDataObj.endmin + " " + formDataObj.endampm,
			"building" : formDataObj.building,
			"roomNum" : formDataObj.roomNum,
			"email" : getUserEmail(),
			"meetDate" : getCurrentDate(),
			"mode" : 'a'
		};
		
		// Make sure that message area does not say No Events
		document.getElementById("event-messages").innerHTML = "";
		
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
				// Hide the new event form div
				document.getElementById("newevent").style.display = "none";
				// Show the event list
				document.querySelector("#eventlist").style.display = "block";
				// Show the event add button
				document.getElementById("event-add-btn").style.display = "block";
				
				let id = "mid" + data.id.substring(0, data.id.length);
				
				// Add the event's times to the events object in order to get back where the event
				// falls in relation to other events chronologically
				let insertIdx = events.addEventTimes(id, requestObj.start, requestObj.end);
				
				// Create a card in the event container at the chronological index for this event
				addEventCard(insertIdx, id, requestObj.title, requestObj.start, requestObj.end, requestObj.building, requestObj.roomNum, 'm');
			})
			.catch(error => {
				console.log(error);
			});
	}
	else{
		console.log("Event Form Submit - Update");
		// update event in database
		let formData = new FormData(formElem);
		let formDataObj = Object.fromEntries(formData);
		let requestObj = {
			"id" : formElem.id.substring(3),
			"title" : formDataObj.title,
			"start" : "" + ("0" + formDataObj.starthr).slice(-2) + ":" + formDataObj.startmin + " " + formDataObj.startampm,
			"end" : "" + ("0" + formDataObj.endhr).slice(-2) + ":" + formDataObj.endmin + " " + formDataObj.endampm,
			"building" : formDataObj.building,
			"roomNum" : formDataObj.roomNum,
			"email" : getUserEmail(),
			"meetDate" : getCurrentDate(),
			"mode" : 'u'
		};		
		
		//Send request to server to update an existing event in event database
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
				// Hide the new event form div
				document.getElementById("newevent").style.display = "none";
				// Show the event add button
				document.getElementById("event-add-btn").style.display = "block";
				
				// Get new index of event's placement in chronological order of events
				let newInsertIdx = events.updateEventTimes("mid" + requestObj.id, requestObj.start, requestObj.end);
				
				// Remove the current card for this event from the event container
				let eventContainer = document.getElementById("eventlist");
				let eventCard = eventContainer.querySelector("#mid" + requestObj.id);
				eventContainer.removeChild(eventCard);
				
				// Add a new card for this event to the event container
				addEventCard(newInsertIdx, "mid" + requestObj.id, requestObj.title, requestObj.start, requestObj.end, requestObj.building, requestObj.roomNum, 'm');
				
			})
			.catch(error => {
				console.log(error);
			});
	}
});


// Add an event card using the given information
function addEventCard(insertidx, mid, title, start, end, building, roomNum, eventType){
	// Retrieve the container for the event cards from the DOM
	let eventContainer = document.querySelector("#eventlist");
	
	// Create the event card
	let eventCard = document.createElement("div");
	eventCard.id = mid;
	eventCard.classList.add("card");
	eventCard.classList.add("card-width");
	
	// Create the event card header using the event's title
	let eventTitle = document.createElement("div");
	eventTitle.innerHTML = title;
	eventTitle.classList.add("card-header");
	// Create the event card body using the given information
	let eventBody = document.createElement("div");
	eventBody.classList.add("card-body");
	let eventTime = document.createElement("p");
	eventTime.innerHTML = start + "-" + end;
	eventTime.classList.add("card-text");
	let eventLoc = document.createElement("p");
	eventLoc.innerHTML = building + ", Room " + roomNum;
	eventLoc.classList.add("card-text");
	
	// Append event time and location to the event card body
	eventBody.appendChild(eventTime);
	eventBody.appendChild(eventLoc);
	// Append the event card header and body to the event card
	eventCard.appendChild(eventTitle);
	eventCard.appendChild(eventBody);
	
	// Allow for updating and deleting non-class events (classes cannot be updated here)
	if(eventType === 'm'){
		let updateBtn = document.createElement("button");
		let updateIcon = document.createElement("i");
		// Add Edit image to icon
		updateIcon.classList.add('bi', 'bi-pencil-square');
		// Append Edit icon to update button
		updateBtn.appendChild(updateIcon);
		// Hide the event add button
		document.getElementById("event-add-btn").style.display = "block";
		
		// Event listener when click update and autofill event form
		updateBtn.addEventListener('click', e => {
			console.log("Click Update Event");
			let thisEventBody;
			if(e.target.nodeName === "I"){ // It is the icon
				thisEventBody = e.target.parentNode.parentNode;
			}
			else{ // It is the button element
				thisEventBody = e.target.parentNode;
			}
			let thisEventCard = thisEventBody.parentNode;
			
			// Show the new event form div
			document.getElementById("newevent").style.display = "block";
			let formElem = document.querySelector("#newevent form");
			formElem.id = thisEventCard.id;
			
			// Fill in the form inputs with the current event data
			// Fill in the title
			formElem.querySelector("#title").value = thisEventCard.children[0].innerHTML;
			
			// Fill in the start and end times
			let hrValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
			let minValues = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
			let AmPmValues = ["AM", "PM"];
			let start_end = thisEventBody.children[0].innerHTML.split("-"); // e.g., ["12:00 AM", "1:00 AM"] 
			
			// To fill in the start time
			let time_ampm = start_end[0].split(" "); // e.g., ["12:00", "AM"]
			let hr_min = time_ampm[0].split(":"); //e.g., ["12", "00"]
			formElem.querySelector("#starthr").selectedIndex = hrValues.indexOf("" + parseInt(hr_min[0]));
			formElem.querySelector("#startmin").selectedIndex = minValues.indexOf(hr_min[1]);
			formElem.querySelector("#startampm").selectedIndex = AmPmValues.indexOf(time_ampm[1]);
			
			// To fill in the end time
			time_ampm = start_end[1].split(" "); // e.g., ["1:00", "AM"]
			hr_min = time_ampm[0].split(":"); //e.g., ["1", "00"]
			formElem.querySelector("#endhr").selectedIndex = hrValues.indexOf("" + parseInt(hr_min[0]));
			formElem.querySelector("#endmin").selectedIndex = minValues.indexOf(hr_min[1]);
			formElem.querySelector("#endampm").selectedIndex = AmPmValues.indexOf(time_ampm[1]);
			
			let building_room = thisEventBody.children[1].innerHTML.split(", Room "); 
			
			// Fill in the building
			formElem.querySelector("#building").value = building_room[0];
			
			// Fill in the roomNum
			formElem.querySelector("#roomNum").value = building_room[1];
		});
	
		let delBtn = document.createElement("button");
		let delIcon = document.createElement("i");
		// Add Trash image to icon
		delIcon.classList.add('bi', 'bi-trash3-fill');
		// Add Trash icon to delete button
		delBtn.appendChild(delIcon);
		// Event listener to delete event
		delBtn.addEventListener('click', e => {
			console.log("Delete Event - Click");
			let thisEventBody;
			if(e.target.nodeName === "I"){ // It is the icon
				thisEventBody = e.target.parentNode.parentNode;
			}
			else{ // It is the button element
				thisEventBody = e.target.parentNode;
			}
			let thisEventCard = thisEventBody.parentNode;
			
			//Send request to server to delete an existing event from event database
			
			// Substring the id to get rid of 'mid' part of id
			fetch('http://127.0.0.1:3000/meetings', {
				method : 'POST',
				headers: {'Content-Type': 'application/json'},
				body : JSON.stringify({"id" : thisEventCard.id.substring(3), "mode" : 'd'})
				})
				.then(response => {
					if (!response.ok){
						throw new Error('HTTP error: ${response.status}');
					}
					return response.json();
				})
				.then(data => {
					console.log(data.success);
					
					// Remove this event's times from the events object
					events.removeEventTimes(thisEventCard.id);
					
					// Remove the corresponding card from the event card container
					let eventContainer = document.getElementById("eventlist");
					eventContainer.removeChild(thisEventCard);
					if(eventContainer.children.length === 0){ // event container is empty
						// Hide the event container
						eventContainer.style.display = "none";
						
						// Display message saying there are no events
						document.getElementById("event-messages").innerHTML = "No Events";
					}
				})
				.catch(error => {
					console.log(error);
				});
		});
		
		eventBody.appendChild(updateBtn);
		eventBody.appendChild(delBtn);
	}
	
	
	
	// Make the event card a child of the event container
	// If there are no event cards, append event card to the container
	if(eventContainer.children.length === 0){
		eventContainer.appendChild(eventCard);
	}
	else{ //Otherwise, add the event at the specified index given by insertidx 
		eventContainer.insertBefore(eventCard, eventContainer.children[insertidx]);
	}
};


/*
// Add event to the event table
function addEventTableRow(insertidx, mid, title, start, end, building, roomNum, eventType){
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
		// Add Edit icon to update table element
		updateTd.classList.add('edit-icon');
		// Hide the event add button
		document.getElementById("event-add-btn").style.display = "block";
		
		// Event listener when click update and autofill assignment form
		updateTd.addEventListener('click', e => {
			console.log("Click Update Event");
			let dataRow = e.target.parentNode;
			// Show the new event form div
			document.getElementById("newevent").style.display = "block";
			let formElem = document.querySelector("#newevent form");
			formElem.id = dataRow.id;
/*			
			/* Fill in the form inputs with the current event data*/
			// Fill in the title
/*			formElem.querySelector("#title").value = dataRow.children[0].innerHTML;
			
			// Fill in the start and end times
			let hrValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
			let minValues = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
			let AmPmValues = ["AM", "PM"];
			let start_end = dataRow.children[1].innerHTML.split("-"); // e.g., ["12:00 AM", "1:00 AM"] 
			
			// To fill in the start time
			let time_ampm = start_end[0].split(" "); // e.g., ["12:00", "AM"]
			let hr_min = time_ampm[0].split(":"); //e.g., ["12", "00"]
			formElem.querySelector("#starthr").selectedIndex = hrValues.indexOf("" + parseInt(hr_min[0]));
			formElem.querySelector("#startmin").selectedIndex = minValues.indexOf(hr_min[1]);
			formElem.querySelector("#startampm").selectedIndex = AmPmValues.indexOf(time_ampm[1]);
			
			// To fill in the end time
			time_ampm = start_end[1].split(" "); // e.g., ["1:00", "AM"]
			hr_min = time_ampm[0].split(":"); //e.g., ["1", "00"]
			formElem.querySelector("#endhr").selectedIndex = hrValues.indexOf("" + parseInt(hr_min[0]));
			formElem.querySelector("#endmin").selectedIndex = minValues.indexOf(hr_min[1]);
			formElem.querySelector("#endampm").selectedIndex = AmPmValues.indexOf(time_ampm[1]);
			
			// Fill in the building
			formElem.querySelector("#building").value = dataRow.children[2].innerHTML;
			
			// Fill in the roomNum
			formElem.querySelector("#roomNum").value = dataRow.children[3].innerHTML;
		});
	
		let delTd = document.createElement("td");
		// Add Trash icon to delete table element
		delTd.classList.add('trash-icon');
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
					
					// Remove this event's times from the events object
					events.removeEventTimes(dataRow.id);
					
					// Remove the corresponding row from the assignment table
					let eventTable = dataRow.parentNode;
					eventTable.removeChild(dataRow);
					if(eventTable.children.length === 1){ // only tbody is left as a table child
						// Hide the assignment table
						eventTable.style.display = "none";
						
						// Display message saying there are no events
						document.getElementById("event-messages").innerHTML = "No Events";
					}
				})
				.catch(error => {
					console.log(error);
				});
		});
		
		dataRow.appendChild(updateTd);
		dataRow.appendChild(delTd);
	}
	
	// Make the dataRow a child of the event table
	// If there is no data in the table (only the header row), append event row to the table
	if(eventTable.children.length <= 1){
		eventTable.appendChild(dataRow);
	}
	else{ //Otherwise, add the event at the specified index given by insertidx 
		eventTable.insertBefore(dataRow, eventTable.children[insertidx+1]); //(+1 to account for header row)
	}
};
*/