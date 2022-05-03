
function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = null;
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
}

document.getElementById("pushNotificationsToggle").addEventListener("click", function() {
    alert("push mode");
    //getUserEmail();
    console.log(1);

    fetch('http://127.0.0.1:3000/get_user', {
		method : 'POST',
		headers: {'Content-Type': 'application/json'},
		body : JSON.stringify({"email" : getUserEmail()})
		})
		.then(response => {
			if (!response.ok){
				throw new Error('HTTP error: ${response.status}');
			}
            return response.json();
		})
        .then(data => {
            console.log(data[0].notifyType);
        })  
		.catch(error => {
			console.log(error);
		});	

    alert(3);
});

document.getElementById("emailNotificationsToggle").addEventListener("click", function() {
    alert("email mode");
});

document.getElementById("noNotificationsToggle").addEventListener("click", function() {
    alert("none mode");
});