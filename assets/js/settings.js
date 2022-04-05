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
			console.log(data);
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

/*document.addEventListener('DOMContentLoaded', e => {
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
});*/

/*document.addEventListener('DOMContentLoaded', e => {
	let email = getUserEmail();
	if (email != null){
		
		fetch('http://127.0.0.1:3000/get_pnum', {
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
			document.getElementById("pnumplaceholder").placeholder = data.pnum;

		})
		
 
		.catch(error => {
			console.log(error);
		});		
	}
});*/

/*document.addEventListener('DOMContentLoaded', e => {
	let email = getUserEmail();
	if (email != null){
		
		fetch('http://127.0.0.1:3000/get_pwd', {
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
			document.getElementById("pwdplaceholder").placeholder = data.pwd;
		})
		
 
		.catch(error => {
			console.log(error);
		});		
	}
});*/

//const settingsContainer = document.getElementById("settings");
//const updateButton = settingsContainer.querySelector("#update");

document.addEventListener('DOMContentLoaded', e => {
	// Get notes from database
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

//updateButton.addEventListener('click', () => createAccountElement("", "", ""));

document.getElementById("form").addEventListener('submit', e => {
	console.log("Save Button - Submit");
	e.preventDefault();
	let formElem = e.target;
	//let divElem = formElem.parentElement;
	//let noteid = divElem.id;
	console.log(formElem);

	let formData = new FormData(formElem);
	let requestObj = Object.fromEntries(formData);
	console.log(requestObj);
	requestObj.email = getUserEmail();
	//requestObj.id = noteid;
	requestObj.mode = 'u';
	
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




/*function createAccountElement(uname, pwd, pnum){
	//console.log("In Create Note Element");
	let settingsform = document.querySelector("#form");
	console.log(settingsform);
	document.querySelector("#form").addEventListener('submit', e => {
		console.log("Save Button - Submit");
		e.preventDefault();
		let formElem = e.target;
		//let divElem = formElem.parentElement;
		//let noteid = divElem.id;
		console.log(formElem);

		let formData = new FormData(formElem);
		let requestObj = Object.fromEntries(formData);
		requestObj.email = getUserEmail();
		//requestObj.id = noteid;
		requestObj.mode = 'u';
		
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

}*/















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

