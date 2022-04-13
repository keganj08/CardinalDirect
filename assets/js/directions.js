var createRoute = document.getElementById("createRoute");
createRoute.addEventListener("click", function(e){
    e.preventDefault();
	//grab entrance from url
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    
    var entrance = params.entrance;
	console.log(entrance[0]);
    

	if (entrance == "ne"){
		entrance = "f1 ne";
	}
	else if (entrance == "nw"){
		entrance = "f1 nw";
	}
	else if (entrance == "se"){
		entrance = "f1 se";
	}
	else{//entrance = "sw"
		entrance = "f1 sw";
	}
	console.log(entrance);

	//set destination to what the user enters in search bar
	var destination = document.getElementById('destination').value;
    console.log(destination);

    //INTERSECTIONS
    var location = document.createElement('destination');

    if (destination == "154"){
        location.setAttribute("destination", "f1 ne");
    }

    //Add rest of attributes

    console.log(location);
    console.log(destination);

    

    wsc.createEdges();
    //wsc.runDijkstra("f1 se"); //entrances  if only w- add space where s is
    wsc.runDijkstra(entrance);
    //path = wsc.getPathTo("f3 ne"); //any endpoint
    let path = wsc.getPathTo(location.getAttribute("destination"));
    console.log(path);//array

    for (let i = 0; i < path.length-1; i++){
        //NE corner
        if (path[i].includes("ne")){
            if (path[i+1].includes("nw")){
                path[i] = "Go Straight";
            }
        }
        //NW corner
        if (path[i].includes("nw")){
            if (path[i+1].includes("ne")){
                path[i] = "Go Straight";
            }
            //midpoint
            if (path[i+1].includes("w",4)){
                path[i] = "Turn Right & Go Straight";
                if (path[i+2] != null && path[i+2].includes("sw")){
                    path[i+1] = "Go Straight & Turn Left";
                }
            }
        }
        //SE corner
        if (path[i].includes("se")){
            if (path[i+1].includes("sw")){
                path[i] = "Go Straight";
            }
            //midpoint
            if (path[i+1].includes("e",4)){
                if(path[i].charAt(1) === path[i+1].charAt(1)){//if on the same floor
                    path[i] = "Turn Left & Go Straight";
                }
                if (path[i+2] != null && path[i+2].includes("ne") && path[i].charAt(1) === path[i+1].charAt(1)){//if "e" is not the destination
                    path[i+1] = "Go Straight & Turn Left";
                }
                else{
                    path[i+1] = "Go Straight";
                }
            }
            
        }
        //SW corner
        if (path[i].includes("sw")){
            if (path[i+1].includes("se")){
                path[i] = "Go Straight";
            }
            //midpoint
            if (path[i+1].includes("w",4)){
                if (path[i].charAt(1) === path[i+1].charAt(1)){
                    path[i] = "Turn Left & Go Straight";
                }
                if (path[i+2] != null && path[i+2].includes("nw") && path[i].charAt(1) === path[i+1].charAt(1)){
                    path[i+1] = "Go Straight & Turn Right";
                }
                if (path[i+2] != null && path[i+2].includes("e",4)){
                    path[i+1] = "Turn Right & Go Straight";
                }
                else{
                    path[i+1] = "Go Straight";
                }
            }
        }
        //STAIRS
        if (path[i].charAt(3) === path[i+1].charAt(3) && path[i].charAt(4) === (path[i+1].charAt(4))){
            if(path[i].charAt(1) < path[i+1].charAt(1)) {
                path[i] = "Go Upstairs";
            }else{
                path[i] = "Go Downstairs";
            }
        }
        
    }
    //display directions
    /*var num = 1;
    for (let i = 0; i < path.length; i++){
        path[i] = '<br>' + num + ". "+path[i];
        num++;
        path[path.length-1] = '<br>'+ (num-1) + ". Arrived!";
    }
    //print directions
    document.getElementById ("currentInstruction").innerHTML= path;*/

    //Click through directions-->
    directions = document.getElementById("currentInstruction");
    btn = document.getElementById("next");


    btn.addEventListener("onmousedown", stopEvent, false);
    btn.addEventListener("click", nextDirection);

    directions.innerHTML = path[0];
    index = 0;
    function stopEvent(ev) {
        ev.stopPropagation();
    }

    function nextDirection() {
        if (index < path.length - 1){
            index++;
        }
        index %= path.length;
        directions.innerHTML = path[index]; 

        path[path.length-1] = "Arrived!"; 
        
    
    }

    //prev
    btn = document.getElementById("prev");

    btn.addEventListener("onmousedown", stopEvent, false);
    btn.addEventListener("click", prevDirection);


    function stopEvent(ev) {
        ev.stopPropagation();
    }

    function prevDirection() {
        if (index > 0){
            index--;
        }
    
        index %= path.length;
        directions.innerHTML = path[index]; 
    }    
        
        
});








       
       
