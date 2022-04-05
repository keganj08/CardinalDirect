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