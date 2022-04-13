// calendar_listeners.js

/* Next button on calendar increments the month */
document.querySelector("#right_cal_button").addEventListener('click', e => {
	//Clear the today marking if changing the month
	let todayElem = document.getElementById("today");
	if(todayElem !== null){
		todayElem.id = "";
	}
	//Show the next month
	calendar.incrementMonth();
});

/* Prev button on calendar decrements the month */
document.querySelector("#left_cal_button").addEventListener('click', e => {
	//Clear the today marking if changing the month
	let todayElem = document.getElementById("today");
	if(todayElem !== null){
		todayElem.id = "";
	}
	//Show the previous month
	calendar.decrementMonth();
});

document.addEventListener('DOMContentLoaded', e => {
	// Populate the calendar with the current month
	calendar.initialize();
	
	// Update the "showEvents" div with the selected day's events
	getEvents(getCurrentDate());
});

// Click on a day of the calendar
document.querySelector("#calendar tbody").addEventListener('click', e=>{
	const tableElement = e.target;
	if((tableElement !== null) && tableElement.tagName.toLowerCase() === "td"){
		//add clicked date to top of event div
		document.getElementById('eventDate').innerHTML = tableElement.innerHTML + " " + document.getElementById("calendarmonth").innerHTML;
		
		//Remove "selected" from class list of previous selection and add to new target's class list
		let prevSelects = document.getElementsByClassName("selected");
		if(prevSelects.length > 0){ //There should only be one element in prevSelects at most
			prevSelects[0].classList.remove("selected");
		}
		tableElement.classList.add("selected");
		
		// Update the "showEvents" div with the selected day's events
		getEvents(getSelectedDate());
	}
});

// View Daily Schedule Button Click
document.getElementById("daily-sched-btn").addEventListener('click', e => {
	const selectDays = document.getElementsByClassName("selected"); // There should only be one day selected at a time
	let url = window.location.href;
	let idx = url.indexOf("?");
	if(selectDays.length === 0){ // Nothing selected yet, on current day by default
		window.location.href = 'daily_schedule.html' + url.substr(idx) + "&date=" + getCurrentDate();
	}
	else{
		window.location.href = 'daily_schedule.html' + url.substr(idx) + "&date=" + getSelectedDate();
	}
});

//"Logout" button
document.getElementById("logout").addEventListener('click', function(){window.location.href = 'login.html';});

// Click on Back Button
document.getElementById("back-button").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});
