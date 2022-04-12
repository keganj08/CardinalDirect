// calendar_view.js

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