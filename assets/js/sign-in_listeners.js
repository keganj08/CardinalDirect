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


/*
const formElem = document.querySelector('form');

// submit handler

formElem.addEventListener('submit', (e) => {
  // on form submission, prevent default
  e.preventDefault();

  console.log(form.querySelector('input[name="field1"]')); // FOO
  console.log(form.querySelector('input[name="field2"]')); // BAR

  // construct a FormData object, which fires the formdata event
  const formData = new FormData(formElem);
  // formdata gets modified by the formdata event
  console.log(formData.get('field1')); // foo
  console.log(formData.get('field2')); // bar
});

*/