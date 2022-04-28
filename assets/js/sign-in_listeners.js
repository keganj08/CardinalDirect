// sign-in_listeners.js

document.getElementById('sign-inForm').addEventListener('submit', e => {
	//Prevents default form submission (as in the html page)
	e.preventDefault();
	//Gets the form data from the HTML page
	const formElem = document.getElementById('sign-inForm');
	const formData = new FormData(formElem);
	
	
	//Send request to server to add a new user to user database
	fetch('http://127.0.0.1:3000/login', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify(Object.fromEntries(formData))
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
			return response.json();
		})
		.then(data => {
			// data will be true if password matches and false if it does not
			if(data.success){
				window.location.href = "main_landing.html?user=" + data.user;
			}
			else{
				let formInputs = document.querySelectorAll("input");
				formInputs.forEach(function(item){
					item.value = "";
				});
				document.getElementById("error-div").style.display = "block";
			}
		})
		.catch(error => {
			console.log(error);
		});
	
});