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

			resetSelectedToggle();
			if(data[0].notifyType == 'text') {
				document.getElementById('pushNotificationsToggle').classList.add('selectedNotificationToggle');
			} else if(data[0].notifyType == 'email') {
				document.getElementById('emailNotificationsToggle').classList.add('selectedNotificationToggle');
			} else {
				document.getElementById('noNotificationsToggle').classList.add('selectedNotificationToggle');
			}
		})
		.catch(error => {
			console.log(error);
		});		
	}
});

function resetSelectedToggle(){
	document.querySelectorAll('.notificationToggle').forEach(function(node) {
		node.classList.remove('selectedNotificationToggle');
	});
	document.getElementById("pushNotificationsToggle")
}

document.getElementById("pushNotificationsToggle").addEventListener("click", function() {
	resetSelectedToggle();
	this.classList.add('selectedNotificationToggle');

	let requestObj = {};
	requestObj.notifyType = 'text';
	requestObj.email = getUserEmail();
	//requestObj.id = noteid;
	requestObj.mode = 'n';
	console.log(requestObj);
	//Send request to server to update an existing note in note database
	fetch('http://127.0.0.1:3000/settings', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(requestObj)
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response;
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		});

});

document.getElementById("emailNotificationsToggle").addEventListener("click", function() {
	resetSelectedToggle();
	this.classList.add('selectedNotificationToggle');

	let requestObj = {};
	requestObj.notifyType = 'email';
	requestObj.email = getUserEmail();
	//requestObj.id = noteid;
	requestObj.mode = 'n';
	console.log(requestObj);
	//Send request to server to update an existing note in note database
	fetch('http://127.0.0.1:3000/settings', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(requestObj)
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response;
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		});
});

document.getElementById("noNotificationsToggle").addEventListener("click", function() {
	resetSelectedToggle();
	this.classList.add('selectedNotificationToggle');
	
	let requestObj = {};
	requestObj.notifyType = 'null';
	requestObj.email = getUserEmail();
	//requestObj.id = noteid;
	requestObj.mode = 'n';
	console.log(requestObj);
	//Send request to server to update an existing note in note database
	fetch('http://127.0.0.1:3000/settings', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(requestObj)
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response;
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		});
});



document.addEventListener('DOMContentLoaded', e => {
	fetch('http://127.0.0.1:3000/settings', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify({"email" : getUserEmail(), "mode" : 'g'})
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			let i=0;
			for(i=0; i<data.length; i++){
				createAccountElement(data[i].username, data[i].pwd, data[i].pnum);
			}
		})
		.catch(error => {
			console.log(error);
		});
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