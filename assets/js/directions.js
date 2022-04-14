//USE FOR MANUAL TESTING   
/*wsc.createEdges();
wsc.runDijkstra("f1 nw");
let path = wsc.getPathTo("f1  e");
console.log(path);//array*/

var createRoute = document.getElementById("createRoute");

createRoute.addEventListener("click", function(e){
    e.preventDefault();//only works if button is clicked, not with the  "enter" key
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

    //INTERSECTION-LOCATION ASSIGNMENTS
    var location = document.createElement('destination');
    //cut intersections in half 
    if (entrance == "f1 ne"){
        if (destination == "154" || destination == "156"){
            //location.setAttribute("destination", "f1 ne");//issue: user already there
            alert("You are already here.");
        }
        //issue: same destination but different hallways 
        if (destination == "111" || destination == "109" || destination == "107" || destination == "144" || destination == "142" || destination == "138" ||
        destination == "136" || destination == "134" || destination == "132"){
            location.setAttribute("destination", "f1 ne");
        }
        if (destination == "103" || destination == "101" || destination == "128" || destination == "126" || destination == "124" || destination == "122" ||
        destination == "118" || destination == "116" || destination == "112"){
            location.setAttribute("destination", "f1  e");
        }
        if (destination == "113" || destination == "115" || destination == "119" || destination == "121" || destination == "101" ){
            location.setAttribute("destination", "f1  w");  
        }
        if (destination == "104" || destination == "106"){
            location.setAttribute("destination", "f1 se");  
        }
        
    }
    if (entrance == "f1 nw"){
        if (destination == "154" || destination == "156"){
            alert("You are already here.");
        }
        if (destination == "113" || destination == "115"){
            location.setAttribute("destination", "f1 nw");
        }
        if (destination == "119" || destination == "121" || destination == "101"){
            location.setAttribute("destination", "f1  w");
        }
        if (destination == "128" || destination == "126" || destination == "124" || destination == "122" || destination == "118" || destination == "116" ||
        destination == "101" || destination == "103"){
            location.setAttribute("destination", "f1  e");
        }
        if (destination == "104" || destination == "106"){
            location.setAttribute("destination", "f1 sw");
        }
        if (destination == "107" || destination == "109" || destination == "111" || destination == "132" || destination == "134" || destination == "136" ||
        destination == "138" || destination == "144" || destination == "148" || destination == "150"){
            location.setAttribute("destination", "f1 ne");
        }
    }
    if (entrance == "f1 sw"){
        if (destination == "104" || destination == "106"){
            alert("You are already here.");
        }
        if (destination == "119" || destination == "121" || destination == "101"){
            location.setAttribute("destination", "f1 sw");
        }
        if (destination == "113" || destination == "115"){
            location.setAttribute("destination", "f1  w");
        }
        if (destination == "107" || destination == "109" || destination == "111" || destination == "132" || destination == "134" || destination == "136" ||
        destination == "138" || destination == "144" || destination == "148" || destination == "150"){
            location.setAttribute("destination", "f1  e");
        }
    }
    if (entrance == "f1 se"){
        if (destination == "104" || destination == "106"){
            alert("You are already here.");
        }
        if (destination == "101" || destination == "103" || destination == "112" || destination == "116" || destination == "118" || destination == "122" ||
        destination == "124" || destination == "126" || destination == "128"){
            location.setAttribute("destination", "f1 se");
        }
        if (destination == "107" || destination == "109" || destination == "111" || destination == "132" || destination == "134" || destination == "136" ||
        destination == "138" || destination == "144" || destination == "148" || destination == "150"){
            location.setAttribute("destination", "f1  e");
        }
        if (destination == "113" || destination == "115" || destination == "119" || destination == "121" || destination == "101" ){
            location.setAttribute("destination", "f1  w");
            
        }
    }
    

    console.log(location);
    console.log(destination);
    
    wsc.createEdges();
    wsc.runDijkstra(entrance);
    let path = wsc.getPathTo(location.getAttribute("destination"));

    console.log(path);//array


    if(path.length > 1){
        for (let i = 0; i < path.length-1; i++){
            if(path[i] != null){
                //NE corner
                if (path[i].includes("ne")){
                    if (path[i+1] != null && path[i+1].includes("nw")){
                        path[i] = "Go Straight";
                    }
                    if (path[i+1] != null && path[i+1].includes("e",4)){
                        if(path[i].charAt(1) === path[i+1].charAt(1)){//if on the same floor
                            path[i] = "Turn Left";
                            path[i+1] = "Go Straight"
                            if(path[i+2] != null && path[i+2].includes("w",4)){
                                path[i+2] = "Turn Right";
                                path[i+3] = "Go Straight";
                                if (destination == "115" || destination == "113"){
                                    path.length+=1;
                                    path[i+4] = "Turn Right";
                                }
                                else{
                                    path.length+=1;
                                    path[i+4] = "Turn Left";
                                }
                            }
                            if(path[i+2] != null && path[i+2].includes("e", 4)){
                                path[i+2] = "Go Straight";
                            }
                        }
                    }

                }  
            
                //NW corner
                if (path[i].includes("nw")){
                    if (path[i+1].includes("ne")){
                        path[i] = "Go Straight";
                        if (destination == "107" || destination == "109" || destination == "111" || destination == "132" || destination == "134" || destination == "136" ||
                        destination == "138" || destination == "144" || destination == "148" || destination == "150"){
                            path[i+1] = "Turn Right";
                        }
                        if(path[i+2] != null && path[i+2].includes("e", 4)){
                            path[i+1] = "Turn Right";
                            path[i+2] = "Go Straight";
                        }
                    }
                    //midpoint
                    if (path[i+1].includes("w",4)){
                        path[i] = "Turn Right";
                        path[i+1] = "Go Straight";
                        if (path[i+2] != null && path[i+2].includes("sw")){
                            path[i+2] = "Go Straight";
                            if (destination == "104" || destination == "106"){
                                path.length+=1;
                                path[i+4] = "Turn Left";
                            }
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
                            path[i] = "Turn Right & Go Straight";
                        }
                        if (path[i+2] != null && path[i+2].includes("ne") && path[i].charAt(1) === path[i+1].charAt(1)){//if "e" is not the destination
                            //path[i+1] = "Go Straight";
                            path[i+2] = "Turn Left";
                        }
                        else{
                            path[i+1] = "Go Straight";
                        }
                    }
                }
                //SW corner
                if (path[i] != null && path[i].includes("sw")){
                    if (path[i+1] != null && path[i+1].includes("se")){
                        path[i] = "Go Straight";
                    }
                    //midpoint
                    if (path[i+1] != null && path[i+1].includes("w",4)){
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
            }
            //E
            
            //W
           
            //STAIRS
            //if (path[i].charAt(3) === path[i+1].charAt(3) && path[i].charAt(4) === (path[i+1].charAt(4))){
                //if(path[i].charAt(1) < path[i+1].charAt(1)) {
                   // path[i] = "Go Upstairs";
                //}else{
                    //path[i] = "Go Downstairs";
                //}
            //}
            
        }
    }
    //user only needs to turn left/right to arrive at destination
    if (path[0].includes("ne") && path.length == 1){
        path[0] = "Turn Left";  
    }
    if (path[0].includes("sw") && path.length == 1){
        path[0] = "Turn Left";  
    }
    if (path[0].includes("nw") && path.length == 1){
        path[0] = "Turn Right";  
    }
    if (path[0].includes("se") && path.length == 1){
        path[0] = "Turn Right";  
    }
 
    
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
     
     
        path.length +=1 ;
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












       
       
