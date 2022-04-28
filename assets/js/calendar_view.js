// calendar_view.js

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = "";
	if(idx !== -1){
		email = url.substring(idx + 6) + "@noctrl.edu";
	}
	return email;
}

function populateCalendar(month_txt, month, year){
	// Label month and year of calendar displayed.
	document.getElementById("calendarmonth").innerHTML = month_txt + " " + year;

	let firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of week of first day of month (Sun(0) - Sat(6))
	let tableVals = document.getElementsByTagName("td");
	let numDaysInMonth = new Date(year, month+1, 0).getDate(); // Number of days of the current month
	let ctr;
	
	// Put empty strings in table values prior to first day.
	for(ctr = 0; ctr<firstDayOfMonth; ctr++){
		tableVals[ctr].innerHTML = "";
	}
	// Populate correct positions of table with dates.
	let i=1;
	for(ctr = firstDayOfMonth; ctr<firstDayOfMonth + numDaysInMonth; ctr++){
		tableVals[ctr].innerHTML = i;
		i++;
	}
	// Put empty strings in table values after end of month.
	for(ctr = firstDayOfMonth + numDaysInMonth; ctr<tableVals.length; ctr++){
		tableVals[ctr].innerHTML = "";
	}
	
	// If the last row of the table is empty, hide it.
	if(tableVals[35].innerHTML == ""){
		tableVals[35].parentElement.style.visibility = "collapse";
	}
	else{
		tableVals[35].parentElement.style.visibility = "visible";
	}
	
	//Remove "selected" from class list of previous selection
	let prevSelects = document.getElementsByClassName("selected");
	if(prevSelects.length > 0){ //There should only be one element in prevSelects at most
		prevSelects[0].classList.remove("selected");
	}
	
	let today = new Date(); // Current day object
	// If the month displayed is the current month, highlight the current day
	if(today.getMonth() === month){
		//mark today's date in the calendar
		tableVals[firstDayOfMonth + today.getDate() - 1].id = "today";
		document.getElementById('eventDate').innerHTML = today.getDate() + " " + month_txt + " " + year;
	}
	else{
		// Add "selected" to class list of first day of month
		tableVals[firstDayOfMonth].classList.add("selected");
		document.getElementById('eventDate').innerHTML = 1 + " " + month_txt + " " + year;
	}
	
	// Update the "showEvents" div with the selected day's events
	getEvents(getSelectedDate());
}

function addEventCard(insertidx, title, startTime, endTime){
	// Retrieve the event card container from the DOM
	const eventContainer = document.querySelector("#eventlist");
	
	// Create the event card
	let eventCard = document.createElement("div");
	eventCard.classList.add("card", "card-width");
	
	// Create the event card title and body for the given information
	let eventTitle = document.createElement("div");
	eventTitle.innerHTML = title;
	eventTitle.classList.add("card-header");
	let eventBody = document.createElement("div");
	eventBody.classList.add("card-body");
	let eventTime = document.createElement("p");
	eventTime.innerHTML = startTime + "-" + endTime;
	eventTime.classList.add("card-text");
	
	// Append card title and body elements to the event card
	eventBody.appendChild(eventTime);
	eventCard.appendChild(eventTitle);
	eventCard.appendChild(eventBody);
	
	// Make the event card a child of the event card container
	// If there are no cards in the container, append event card to the container
	if(eventContainer.children.length == 0){
		eventContainer.appendChild(eventCard);
	}
	else{ //Otherwise, add the event at the specified index given by insertidx 
		eventContainer.insertBefore(eventCard, eventContainer.children[insertidx]);
	}
}

function getCurrentDate(){
	let today = new Date();
	let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let date = ("0" + today.getDate()).slice(-2);
	return today.getFullYear() + '-' + month + '-' + date;
}

function getSelectedDate(){
	let month = ("0" + (calendar.getMonth() + 1)).slice(-2);
	let eventDateSplit = document.getElementById("eventDate").innerHTML.split(" ");
    let date = ("0" + eventDateSplit[0]).slice(-2);
	return calendar.getYear() + '-' + month + '-' + date;
}

function getEvents(formattedDate){
	// Empty the "showEvents" table contents
	let eventContainer = document.querySelector("#eventlist");
	while (eventContainer.firstChild) {
	  eventContainer.removeChild(eventContainer.firstChild);
	}
	
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
			body : JSON.stringify({"email" : getUserEmail(), "meetDate" : formattedDate, "mode" : 'g'})
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
		
		// Make a date object for the date given in formattedDate
		let selectDay = new Date(formattedDate + "T12:00:00Z");
		selectDay.setHours(0,0,0,0); // Clears out any time
		
		// Handle class data
		console.log(classData);
		let courseIds = []; // List of course ids for courses in which the user is enrolled
		// U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday
		let daysOfWeek = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
		// Get Day of Week of given day	
		let selectDayOfWeek = daysOfWeek[selectDay.getDay()];
		
		// Loop through each class record
		let i=0;
		for(i=0; i<classData.length; i++){
			let rec = classData[i];
			let simpleCid = rec.cid.split("*", 2).join(' ');
			
			// Get the start and end dates of the semester in which this class runs
			let semStartDate = new Date(rec.startDate);
			semStartDate.setHours(0,0,0,0); // Clears out any time
			let semEndDate = new Date(rec.endDate);
			semEndDate.setHours(0,0,0,0); // Clears out any time
			
			// Only include courses if the current day is within the semester
			if((semStartDate.valueOf() <= selectDay.valueOf()) && (selectDay.valueOf() <= semEndDate.valueOf())){
				// Makes sure we are not double-including courses and only showing courses held on
				// the given day
				if((rec.dow.indexOf(selectDayOfWeek)!== -1) && (courseIds.indexOf(simpleCid) === -1)){
					courseIds.push(simpleCid); //add course id
					// Find position to insert this event to maintain chronological order
					let insertIdx = events.addEventTimes(simpleCid, rec.startTime, rec.endTime);
					// Add event to "showEvents" table
					addEventCard(insertIdx, simpleCid + " " + rec.name, rec.startTime, rec.endTime);
				}
			}
		}
		
		// Handle meeting data	
		console.log(meetingData);
		// Loop through each meeting record
		meetingData.forEach(rec => {
			// Find position to insert this event to maintain chronological order
			let insertIdx = events.addEventTimes(rec.mid, rec.start, rec.end);
			// Add event to "showEvents" table
			addEventCard(insertIdx, rec.title, rec.start, rec.end);
		});
				
		//If there are events to display, make the table visible. 
		//Otherwise, show the "No Events" message
		if(courseIds.length > 0 || meetingData.length > 0){
			document.getElementById("messageDiv").style.display = "none";
			document.querySelector("#eventlist").style.display = "block";
		}
		else{
			document.getElementById("messageDiv").style.display = "block";
			document.querySelector("#eventlist").style.display = "none";
		}
	})
	.catch(error => {
		console.log(error);
	});
}
