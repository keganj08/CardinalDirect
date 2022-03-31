// calendar_view.js

function populateCalendar(month_txt, month, year){
	// Label month and year of calendar displayed.
	document.getElementById("calendarmonth").innerHTML = month_txt + " " + year;
	document.getElementById("monthDay").innerHTML = " " + month_txt + " " + year;


	let firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of week of first day of month (Sun(0) - Sat(6))
	let tableVals = document.getElementsByTagName("td");
	let numDaysInMonth = new Date(year, month+1, 0).getDate(); // Number of days of the current month
	let ctr;
	
	
	console.log(today.getDate());
	// Put empty strings in table values prior to first day.
	for(ctr = 0; ctr<firstDayOfMonth; ctr++){
		tableVals[ctr].innerHTML = "";
	}
	// Populate correct positions of table with dates.
	let i=1;
	for(ctr = firstDayOfMonth; ctr<firstDayOfMonth + numDaysInMonth; ctr++){
		tableVals[ctr].innerHTML = i;
		i++;

		//mark today's date
		if ((today.getDate()+1).toString() === ctr.toString()){
			tableVals[ctr].className = "today";
		}
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

	document.getElementById('eventDate').innerHTML = today.getDate().toString() + " " + document.getElementById("monthDay").innerHTML;

}

let today = new Date();
document.querySelectorAll("td").forEach(day => {
	day.addEventListener("click", event => {
		console.log(event.currentTarget.innerHTML);//day clicked
		//add clicked date to top of event div
	
		document.getElementById("eventDate").innerHTML = " ";
		document.getElementById('eventDate').innerHTML = event.currentTarget.innerHTML + document.getElementById("monthDay").innerHTML;

		event.currentTarget.classList.toggle("selected");

		})
});
/* Prev button on calendar decrements the month */
document.querySelector("#left_cal_button").addEventListener('click', e => {
	calendar.decrementMonth();
	document.getElementById("selected").innerHTML = " ";
});
	



