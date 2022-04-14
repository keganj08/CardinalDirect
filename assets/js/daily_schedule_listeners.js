// daily_schedule_listeners.js

var courseIds = {
	cids: [],
	simpleCids: [],
	addCourse: function(cid){
		this.cids.push(cid);
		this.simpleCids.push(cid.split("*", 2).join(' '));
	},
	getCids: function(){return this.cids;},
	getSimpleCids: function(){return this.simpleCids;},
	getCidFromSimple: function(simpleCid){
		let idx = this.simpleCids.indexOf(simpleCid);
		let cid = null;
		if(idx !== -1){
			cid = this.cids[idx];
		}
		return cid;
	},
	getSimpleFromCid: function(cid){
		let idx = this.cids.indexOf(cid);
		let simpleCid = null;
		if(idx !== -1){
			simpleCid = this.simpleCids[idx];
		}
		return simpleCid;
	},
	getCidIdx: function(cid){return this.cids.indexOf(cid);},
	getSimpleIdx: function(simpleCid){return this.simpleCids.indexOf(simpleCid);}
};

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
		datestring = url.substr(dateidx + 6); 
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
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
	else if(idx !== -1 && endidx !== -1){ // There is a date in the url
		email = url.substring(idx + 6, endidx) + "@noctrl.edu";
	}
	return email;
}

// Once the page is loaded, get the user's classes, meetings, assignments, and to-do list
document.addEventListener('DOMContentLoaded', e => {
	//Show the current date
	document.getElementById("date-header").innerHTML = new Date(getCurrentDate() + "T12:00:00Z").toLocaleDateString();
	
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
		
		//If there are event or assignment data to display, make the tables visible
		if(classData.length > 0 || meetingData.length > 0){
			document.getElementById("eventlist").style.display = "block";
		}
		if(assignmentData.length > 0){
			document.getElementById("assignmentlist").style.display = "block";
		}
		
		// Handle class data
		console.log(classData);
		// U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday
		let daysOfWeek = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
		// Get Day of Week of given day
		let selectDayOfWeek = daysOfWeek[new Date(getCurrentDate() + "T12:00:00Z").getDay()];	
		let assigFormCidSelect = document.querySelector("#cid");
		let i=0;
		for(i=0; i<classData.length; i++){
			let rec = classData[i];
			console.log("Rec:" + rec.cid);
			// Makes sure we are not double-including courses
			if((rec.dow.indexOf(selectDayOfWeek) !== -1) && (courseIds.getCidIdx(rec.cid) === -1)){
				courseIds.addCourse(rec.cid); //add course id
				let simpleCid = courseIds.getSimpleFromCid(rec.cid);
				addEventTableRow("", simpleCid + " " + rec.name, rec.startTime, rec.endTime, rec.building, rec.roomNum, 'c');
				
				// Add each class id to the select options for "associated with" under assignment
				let selectOption = document.createElement("option");
				selectOption.value = rec.cid;
				selectOption.innerHTML = simpleCid;
				assigFormCidSelect.appendChild(selectOption);
			}
		}
		
		// Handle meeting data	
		console.log(meetingData);
		meetingData.forEach(rec => {
			console.log(rec);
			addEventTableRow(rec.mid, rec.title, rec.start, rec.end, rec.building, rec.roomNum, 'm');
		});
		
		// Handle assignment data
		console.log(assignmentData);
		assignmentData.forEach(rec => {
			console.log(rec);
			addAssignmentTableRow(rec.aid, rec.title, rec.dueTime, rec.cid);
		});
			
		// Handle to-do list data
		console.log(todoData);
		if(todoData.length > 0){
			document.querySelector("#todolist table").id = todoData[0].tid;
		}
		todoData.forEach(rec => {
			console.log(rec);
			addToDoListItem(rec.description, rec.isComplete);
		});
		
	})
	.catch(error => {
		console.log(error);
	});
	
});

document.getElementById("left_button").addEventListener('click', e => {
	let yesterday = new Date(getCurrentDate() + "T12:00:00Z");
	yesterday.setDate(yesterday.getDate()-1);
	let month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
	let date = ("0" + yesterday.getDate()).slice(-2);
	let datestring = yesterday.getFullYear() + '-' + month + '-' + date;
	let url = window.location.href;
	let idx = url.indexOf("&date=");
	if(idx !== -1){
		window.location.href = url.substring(0, idx) + "&date=" + datestring;
	}
	else{
		window.location.href = url + "&date=" + datestring;
	}
});

document.getElementById("right_button").addEventListener('click', e => {
	let tomorrow = new Date(getCurrentDate() + "T12:00:00Z");
	tomorrow.setDate(tomorrow.getDate()+1);
	let month = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
	let date = ("0" + tomorrow.getDate()).slice(-2);
	let datestring = tomorrow.getFullYear() + '-' + month + '-' + date;
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
		user = url.substr(idx);
	}
	else if(idx !== -1 && endidx !== -1){ // There is a date in the url
		user = url.substring(idx, endidx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});

document.getElementById("logout").addEventListener('click', e => {window.location.href = 'login.html';});