// calendar_listeners.js

/* Next button on calendar increments the month */
document.querySelector("#right_cal_button").addEventListener('click', e => {
	calendar.incrementMonth();
});

/* Prev button on calendar decrements the month */
document.querySelector("#left_cal_button").addEventListener('click', e => {
	calendar.decrementMonth();
});

//"Logout" button
document.getElementById("logout").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'login.html';
});