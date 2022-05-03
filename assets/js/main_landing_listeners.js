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
		buttons[1].style.display = "none";
		buttons[4].style.display = "none";
		document.querySelector("#logout").style.display = "none";
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
			document.querySelector("#welcome-div h2").innerHTML = "Welcome, " + data.username;
		})
		.catch(error => {
			console.log(error);
		});		
	}
});

//buttons[0] is "Logout" button
document.querySelector("#logout").addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'login.html';
});

//buttons[1] is "My Schedule" button
buttons[1].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'scheduler_landing.html' + user;
});

//buttons[2] is "Navigate Campus" button
buttons[2].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'maps.html' + user;
});

//buttons[3] is "Navigate Buildings" button
buttons[3].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'choose_entrance.html' + user;
});
//buttons[4] is "Settings" button
buttons[4].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'Settings.html' + user;
});



