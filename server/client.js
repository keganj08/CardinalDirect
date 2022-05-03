const publicVapidKey = 'BMUZGiEE7XECrZ1UZJlqaawhJGq17kF_4emEs1g5OSzItEEe4Ezcs2ugH78Yf48a3ep3SjGqRYvNNBBppOtV-x8';

let sentNotification = false;

function getUserEmail(){
	let url = window.location.href;
	let idx = url.indexOf("?user=");
	let email = null;
	if(idx !== -1){
		email = url.substr(idx + 6) + "@noctrl.edu";
	}
	return email;
}

// Every 10 seconds, check if the user needs to leave for class
setInterval(() => {
    let notifType = 'none';
	notifType = fetch('http://127.0.0.1:3000/get_user', {
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
            console.log(data[0]);
            if(data[0].notifyType == 'email'){
                notifType = 'email';
            } else if(data[0].notifyType == 'text'){
                notifType = 'push';
            }
            console.log(notifType);
            //Proceed with check only if a notification has not been sent for this class
            if(!sentNotification){
                // Get classes from database
                fetch('http://127.0.0.1:3000/classes', {
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
                    
                    .then(classData => {
                        console.log("Got classes successfully");
                        // If the user is enrolled in classes,
                        if(classData.length > 0){
                            // Check if any of the user's classes require a notification yet
                            for(let i=0; i<classData.length; i++){
                                //Get the class start time in terms of minutes
                                let classTime = classData[0].startTime.split(':');
                                let classHour = classTime[0];
                                let classMinute = (parseInt(classHour)*60) + parseInt(classTime[1].split(' ')[0]); 
                                
                                //Get the current time in terms of minutes
                                let today = new Date();
                                let currentMinute = today.getHours()*60 + today.getMinutes(); 

                                travelTime = 10; //In minutes
                                
                                //Check whether the class is about to start but has not yet started
                                if((classMinute - currentMinute) <= travelTime && (classMinute - currentMinute) >= 0) {
                                    if(notifType == 'push'){
                                        console.log('test');
                                        if('serviceWorker' in navigator) {
                                            console.log("serviceWorker found");
                                            send().catch(err => console.error(err)); //Send the notification
                                            console.log("Sent class notification");
                                        }
                                    } else if(notifType == 'email'){
                                        fetch('http://127.0.0.1:3000/email', {
                                            method : 'POST',
                                            headers: {'Content-Type': 'application/json'},
                                            body : JSON.stringify({'email': getUserEmail()})
                                        });
                                        console.log('Sent email notification');
                                    }
                                    
                                    //Set flag to prevent repeat notifications
                                    sentNotification = true;
    
                                    //Find ms until class ends
                                    let endTime = classData[0].endTime.split(':');
                                    let endHour = endTime[0];
                                    let endMs = (parseInt(endHour)*60) + parseInt(endTime[1].split(' ')[0]) * 60000;
                                    console.log('Blocking notifications for ' + endMs + ' ms');
    
    
                                    function delay(time) {
                                        return new Promise(resolve => setTimeout(resolve, time));
                                    }
    
                                    //Unset flag after class ends to allow new notifications
                                    delay(endMs).then(() => sentNotification = false);

                                }
                            }
                        } else {
                            console.log('No classes to alert');
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
		})
		.catch(error => {
			console.log(error);
		});
}, 10000);

async function send() {
    // Register service worker
    console.log('Registering service worker');
    const register = await navigator.serviceWorker.register('worker.js', {
        scope: '/' 
    });
    console.log('Service worker registered');

    // Register push notification
    console.log('Registering Push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log(subscription);
    console.log('Push registered...');

    //Send push notification
    console.log('Sending push notification...');
    await fetch('http://127.0.0.1:3000/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent');
}

//Convert format of public key
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}