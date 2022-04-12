// calendar_listeners.js

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = "";
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
	return email;
}

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
