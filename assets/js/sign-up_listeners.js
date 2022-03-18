// sign-up_listeners.js

document.getElementById('sign-upForm').addEventListener('submit', e => {
	//Prevents default form submission (as in the html page)
	e.preventDefault();
	//Gets the form data from the HTML page
	const formElem = document.getElementById('sign-upForm');
	const formData = new FormData(formElem);
	
	//Send request to server to add a new user to user database
	fetch('http://127.0.0.1:3000/new_user', {
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
			// data will be the part of the email before the @
			let user = data.user;
			// change the page to the main landing page, and have the 
			// user as part of the url
			window.location.href = "main_landing.html?user=" + user;
		})
		.catch(error => {
			console.log(error);
		});
});



/*
const formElem = document.querySelector('form');

// submit handler

formElem.addEventListener('submit', (e) => {
  // on form submission, prevent default
  e.preventDefault();

  console.log(form.querySelector('input[name="field1"]'));
  console.log(form.querySelector('input[name="field2"]'));

  // construct a FormData object, which fires the formdata event
  const formData = new FormData(formElem);
  // formdata gets modified by the formdata event
  console.log(formData.get('field1'));
  console.log(formData.get('field2'));
});

*/