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

function getUserPnum(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let pnum = null;
	if(idx !== -1){
		pnum = url.substr(idx + 6);
	}
	return pnum;
}





document.addEventListener('DOMContentLoaded', e => {
	let email = getUserEmail();
	if (email != null){		
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
			document.querySelector("#user-info h5").innerHTML = data.username;
		})
        .then(data => {
			document.querySelector("#user-info h6").innerHTML = email;
		})
        
		.catch(error => {
			console.log(error);
		});		
	}
});

document.addEventListener('DOMContentLoaded', e => {
	let email = getUserEmail();
	if (email != null){
		
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
			document.getElementById("usernameplaceholder").placeholder = data.username;
		})
 
		.catch(error => {
			console.log(error);
		});		
	}
});


/*show data as placeholders - not working */



//buttons[0] is "Back" button
buttons[0].addEventListener('click', e => {
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let user = "";
	if(idx !== -1){
		user = url.substr(idx);
	}
	window.location.href = 'main_landing.html' + user;
});