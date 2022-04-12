// calendar_view.js

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = "";
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
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
		tableVals[35].parentElement.style.visibility = "hidden";
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
}

function addEventToTable(eventTitle, startTime, endTime){
	// Retrieve the table from the DOM
	const eventTable = document.querySelector("#showEvents table");
	
	// Create the table row
	let dataRow = document.createElement("tr");
	
	// Create the table data for the given information
	let dataTitle = document.createElement("td");
	dataTitle.innerHTML = eventTitle;
	let dataTime = document.createElement("td");
	dataTime.innerHTML = startTime + "-" + endTime;
	
	// Append table data elements to the table row
	dataRow.appendChild(dataTitle);
	dataRow.appendChild(dataTime);
	
	// Append table row to the table
	eventTable.appendChild(dataRow);
}

function getCurrentDate(){
	//Will need to handle when get to this page from calendar
	let today = new Date();
	let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let date = ("0" + today.getDate()).slice(-2);
	return today.getFullYear() + '-' + month + '-' + date;
}

function getSelectedDate(){
	//Will need to handle when get to this page from calendar
	let month = ("0" + (calendar.getMonth() + 1)).slice(-2);
	let eventDateSplit = document.getElementById("eventDate").innerHTML.split(" ");
    let date = ("0" + eventDateSplit[0]).slice(-2);
	console.log(calendar.getYear() + '-' + month + '-' + date);
	return calendar.getYear() + '-' + month + '-' + date;
}

function getEvents(formattedDate){
	// Empty the "showEvents" table contents
	let eventTable = document.querySelector("#showEvents table");
	while (eventTable.firstChild) {
	  eventTable.removeChild(eventTable.firstChild);
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
		
		// Handle class data
		console.log(classData);
		let courseIds = []; // List of course ids for courses in which the user is enrolled
		// U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday
		let daysOfWeek = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
		// Get Day of Week of given day
		let selectDayOfWeek = daysOfWeek[new Date(formattedDate + "T12:00:00Z").getDay()];		
		
		let i=0;
		for(i=0; i<classData.length; i++){
			let rec = classData[i];
			let simpleCid = rec.cid.split("*", 2).join(' ');
			
			// Makes sure we are not double-including courses and only showing courses held on
			// the given day
			if((rec.dow.indexOf(selectDayOfWeek)!== -1) && (courseIds.indexOf(simpleCid) === -1)){
				courseIds.push(simpleCid); //add course id
				// Add event to "showEvents" table
				addEventToTable(simpleCid + " " + rec.name, rec.startTime, rec.endTime);
			}
		}
		
		// Handle meeting data	
		console.log(meetingData);
		meetingData.forEach(rec => {
			addEventToTable(rec.title, rec.start, rec.end);
		});
		
		//If there are events to display, make the table visible. 
		//Otherwise, show the "No Events" message
		if(courseIds.length > 0 || meetingData.length > 0){
			document.getElementById("messageDiv").style.display = "none";
			document.querySelector("#showEvents table").style.display = "block";
		}
		else{
			document.getElementById("messageDiv").style.display = "block";
			document.querySelector("#showEvents table").style.display = "none";
		}
	})
	.catch(error => {
		console.log(error);
	});
}
