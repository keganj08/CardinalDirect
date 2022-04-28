// settings.js
buttons = document.querySelectorAll("button");

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = null;
	if(idx !== -1){
		email = url.substring(idx + 6) + "@noctrl.edu";
	}
	return email;
}


document.addEventListener('DOMContentLoaded', e => {
	let email = getUserEmail();
	if (email != null){		
		fetch('http://127.0.0.1:3000/get_user', {
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
			document.querySelector("#user-info h5").innerHTML = data[0].username;
			document.querySelector("#user-info h6").innerHTML = email;
			document.getElementById("usernameplaceholder").value = data[0].username;
			document.getElementById("pnumplaceholder").value = data[0].pnum;
			document.getElementById("pwdplaceholder").value = data[0].pwd;
		})
		.catch(error => {
			console.log(error);
		});		
	}
});

document.getElementById("form").addEventListener('submit', e => {
	e.preventDefault();
	let formElem = e.target;

	let formData = new FormData(formElem);
	let requestObj = Object.fromEntries(formData);
	requestObj.email = getUserEmail();
	requestObj.mode = 'u';
	
	//Send request to server to update an existing user's information in user database
	fetch('http://127.0.0.1:3000/settings', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(requestObj)
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			document.querySelector("#user-info h5").innerHTML = requestObj.username;
		})
		.catch(error => {
			console.log(error);
		});

});

//buttons[0] is "Logout" button
document.getElementById("logout").addEventListener('click', e => {window.location.href = 'login.html';});

//buttons[1] is "Back" button
buttons[1].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substring(idx);
	}
	window.location.href = 'main_landing.html' + user;
});

