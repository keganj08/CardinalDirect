// main_landing_listeners.js
buttons = document.querySelectorAll("button");

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = null;
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
	return email;
}

document.addEventListener('DOMContentLoaded', e => {
	let email = getUserEmail();
	if (email === null){
		buttons[0].style.display = "none";
	}
	else{		
		fetch('http://127.0.0.1:3000/get_username', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify({"email" : email})
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			document.getElementById("welcome-div").innerHTML = "Welcome, " + data.username;
		})
		.catch(error => {
			console.log(error);
		});		
	}
});

//buttons[0] is "My Schedule" button
buttons[0].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});

//buttons[1] is "Navigate Campus" button
buttons[1].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'maps.html' + user;
});

//buttons[2] is "Navigate Buildings" button
buttons[2].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'choose_entrance.html' + user;
});
