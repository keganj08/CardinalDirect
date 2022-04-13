//for use in choose_entrance.html
//choose entrance
//TODO add user to url

document.getElementById("ne").onclick = function(){
    window.location.href = "Interior.html?entrance=ne";
}

document.getElementById("nw").onclick = function(){
    window.location.href = "Interior.html?entrance=nw";
}

document.getElementById("se").onclick = function(){
    window.location.href = "Interior.html?entrance=se";
}

document.getElementById("sw").onclick = function(){
    window.location.href = "Interior.html?entrance=sw";
}


//check if user signed in

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
			
		})
		.catch(error => {
			console.log(error);
		});		
	}
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

