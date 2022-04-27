// daily_schedule_listeners.js

// Gets the date of the daily schedule from the url or constructs it if not provided
function getCurrentDate(){
	let url = window.location.href;
	let dateidx = url.indexOf("&date=");
	let datestring = "";
	// If date is not in the url, we are coming at the daily schedule page from the scheduler landing
	// and need to construct the current date as a string
	if(dateidx === -1){ 
		let today = new Date();
		let month = ("0" + (today.getMonth() + 1)).slice(-2);
		let date = ("0" + today.getDate()).slice(-2);
		datestring = today.getFullYear() + '-' + month + '-' + date;
	}
	else{ // Otherwise, we are coming at the daily schedule from the calendar and have a date in the url.
		datestring = url.substring(dateidx + 6); 
	}
	return datestring;
}

// Gets the user's email from the url
function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let endidx = url.indexOf("&date=");
	let email = "";
	if(idx !== -1 && endidx === -1){ // There is no date in the url
		email = url.substring(idx + 6) + "@noctrl.edu";
	}
	else if(idx !== -1 && endidx !== -1){ // There is a date in the url
		email = url.substring(idx + 6, endidx) + "@noctrl.edu";
	}
	return email;
}

// Once the page is loaded, get the user's classes, meetings, assignments, and to-do list
document.addEventListener('DOMContentLoaded', e => {
	//Show the current date
	const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	document.getElementById("date-header").innerHTML = new Date(getCurrentDate() + "T12:00:00Z").toLocaleDateString(undefined, options);
	
	Promise.all([
		// Get classes from database
		fetch('http://127.0.0.1:3000/classes', {
			method : 'POST',
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify({"email" : getUserEmail(), "mode" : 'g'})
			})
			.then(response => {
				if (!response.ok){
					throw new Error('HTTP error: ${response.status}');
				}
				return response.json();
			}),
		// Get meetings from database
		fetch('http://127.0.0.1:3000/meetings', {
			method : 'POST',
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify({"email" : getUserEmail(), "meetDate" : getCurrentDate(), "mode" : 'g'})
			})
			.then(response => {
				if (!response.ok){
					throw new Error('HTTP error: ${response.status}');
				}
				return response.json();
			}),
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
			}),
		// Get to-do list from database
		fetch('http://127.0.0.1:3000/todo_lists', {
			method : 'POST',
			headers: {'Content-Type': 'application/json'},
			body : JSON.stringify({"email" : getUserEmail(), "listDate" : getCurrentDate(), "mode" : 'g'})
			})
			.then(response => {
				if (!response.ok){
					throw new Error('HTTP error: ${response.status}');
				}
				return response.json();
			})
	]).then(allResponses => {
		const classData = allResponses[0]; //Response from classes fetch
		const meetingData = allResponses[1]; //Response from meetings fetch
		const assignmentData = allResponses[2]; //Response from assignments fetch
		const todoData = allResponses[3]; //Response from to do lists fetch
		
		// If there are event or assignment data to display, make the tables visible
		// Display messages if there are no data
		if(meetingData.length > 0){
			document.querySelector("#eventlist").style.display = "block";
		}
		else{
			// Display message saying there are no events
			document.getElementById("event-messages").innerHTML = "No Events";
		}
		if(assignmentData.length > 0){
			document.querySelector("#assignmentlist").style.display = "block";
		}
		else{
			// Display message saying there are no assignments
			document.getElementById("assignment-messages").innerHTML = "No Assignments Due";
		}
		if(todoData.length == 0){
			// Display message saying there are no assignments
			document.getElementById("todo-messages").innerHTML = "Nothing To Do";
		}
		
		// Handle class data
		console.log(classData);
		let currentDay = new Date(getCurrentDate() + "T12:00:00Z");
		currentDay.setHours(0,0,0,0); // Clears out any time
		// U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday
		let daysOfWeek = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
		// Get Day of Week of given day
		let selectDayOfWeek = daysOfWeek[currentDay.getDay()];	
		let assigFormCidSelect = document.querySelector("#cid");
		
		let i=0;
		for(i=0; i<classData.length; i++){
			let rec = classData[i];
			// Makes sure we are not double-including courses
			if(courseIds.getCidIdx(rec.cid) === -1){
				courseIds.addCourse(rec.cid); //add course id
				// Get the simple, user-friendly course id (i.e., CSCE*494*1*SP22 => CSCE 494)
				let simpleCid = courseIds.getSimpleFromCid(rec.cid);
				
				// Add each class id to the select options for "associated with" under assignment
				let selectOption = document.createElement("option");
				selectOption.value = rec.cid;
				selectOption.innerHTML = simpleCid;
				assigFormCidSelect.appendChild(selectOption);
				
				// Get the start and end dates of the semester in which this class runs
				let semStartDate = new Date(rec.startDate);
				semStartDate.setHours(0,0,0,0); // Clears out any time
				let semEndDate = new Date(rec.endDate);
				semEndDate.setHours(0,0,0,0); // Clears out any time
				
				// Only include courses if the current day is within the semester
				if((semStartDate.valueOf() <= currentDay.valueOf()) && (currentDay.valueOf() <= semEndDate.valueOf())){
					// Test if this course is being held on the given day
					if(rec.dow.indexOf(selectDayOfWeek) !== -1){
						// In case there are no other meetings, since we now have a record to put in the
						// event table, make sure the table is visible and the message does not say "No Events"
						document.querySelector("#eventlist").style.display = "block";
						document.getElementById("event-messages").innerHTML = "";
						
						// Add the event's times to the events object in order to get back where the event
						// falls in relation to other events chronologically
						let insertIdx = events.addEventTimes(simpleCid, rec.startTime, rec.endTime);
						
						// Create a row in the event table at the chronological index for this event
						addEventCard(insertIdx, "", simpleCid + " " + rec.name, rec.startTime, rec.endTime, rec.building, rec.roomNum, 'c');
					}
				}
				
			}
		}
		
		// Handle meeting data	
		console.log(meetingData);
		meetingData.forEach(rec => {
			console.log(rec);
			
			// Add the event's times to the events object in order to get back where the event
			// falls in relation to other events chronologically
			let insertIdx = events.addEventTimes("mid" + rec.mid, rec.start, rec.end);
			
			// Create a row in the event table at the chronological index for this event
			addEventCard(insertIdx, "mid" + rec.mid, rec.title, rec.start, rec.end, rec.building, rec.roomNum, 'm');
		});
						
		// Handle assignment data
		console.log(assignmentData);
		assignmentData.forEach(rec => {
			console.log(rec);
			
			// Add the assignment's due time to the assignments object in order to receive
			// the chronological position of this assignment in relation to other assignments
			let insertIdx = assignments.addDueTime("aid" + rec.aid, rec.dueTime);
			
			// Create a row in the assignment table at the chronological index for this assignment
			addAssignmentCard(insertIdx, "aid" + rec.aid, rec.title, rec.dueTime, rec.cid);
		});
			
		// Handle to-do list data
		console.log(todoData);
		if(todoData.length > 0){
			document.querySelector("#todolist table").id = "tid" + todoData[0].tid;
		}
		todoData.forEach(rec => {
			console.log(rec);
			addToDoListItem(rec.description, rec.isComplete);
		});
		// Calculate the % completed for the progress bar
		calculateProgress();
		
	})
	.catch(error => {
		console.log(error);
	});
	
});


// Click the left button to change the date of the daily schedule to the previous date
document.getElementById("left_button").addEventListener('click', e => {
	// Get the previous date as a well-formatted string
	let yesterday = new Date(getCurrentDate() + "T12:00:00Z");
	yesterday.setDate(yesterday.getDate()-1);
	let month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
	let date = ("0" + yesterday.getDate()).slice(-2);
	let datestring = yesterday.getFullYear() + '-' + month + '-' + date;
	// Add the date string to the url and pull up the page
	let url = window.location.href;
	let idx = url.indexOf("&date=");
	if(idx !== -1){
		window.location.href = url.substring(0, idx) + "&date=" + datestring;
	}
	else{
		window.location.href = url + "&date=" + datestring;
	}
});

// Click the left button to change the date of the daily schedule to the next date
document.getElementById("right_button").addEventListener('click', e => {
	// Get the next date as a well-formatted string
	let tomorrow = new Date(getCurrentDate() + "T12:00:00Z");
	tomorrow.setDate(tomorrow.getDate()+1);
	let month = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
	let date = ("0" + tomorrow.getDate()).slice(-2);
	let datestring = tomorrow.getFullYear() + '-' + month + '-' + date;
	// Add the date string to the url and pull up the page
	let url = window.location.href;
	let idx = url.indexOf("&date=");
	if(idx !== -1){
		window.location.href = url.substring(0, idx) + "&date=" + datestring;
	}
	else{
		window.location.href = url + "&date=" + datestring;
	}
});


document.getElementById("back-button").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let endidx = url.indexOf("&date=");
	let user = "";
	if(idx !== -1 && endidx === -1){ // There is no date in the url
		user = url.substring(idx);
	}
	else if(idx !== -1 && endidx !== -1){ // There is a date in the url
		user = url.substring(idx, endidx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});

document.getElementById("logout").addEventListener('click', e => {window.location.href = 'login.html';});