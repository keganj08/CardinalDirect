
/*//USE FOR MANUAL TESTING   
wsc.createEdges();
wsc.runDijkstra("f1 sw");
let path = wsc.getPathTo("f1  e");
console.log(path);//array
*/

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
    //NE ENTRANCE 
    if (entrance == "f1 ne"){
        //FLOOR 1
        if (destination == "154" || destination == "156"){
            alert("You are already here.");
        }
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
        //FLOOR 2
        if (destination == "254" || destination == "256"){
            location.setAttribute("destination", "f2 ne");
        }
        if (destination == "232" || destination == "234" || destination == "236" || destination == "238" || 
        destination == "213" || destination == "215" || destination == "242" || destination == "244"){
            location.setAttribute("destination", "f2 ne");
            //turn left
        }
        if (destination == "205" || destination == "216" || destination == "218" || destination == "222" || destination == "224" || destination == "226" ||
        destination == "228"){
            location.setAttribute("destination", "f2  e");
        }
        if (destination == "217" || destination == "219" || destination == "221" || destination == "223"){
            location.setAttribute("destination", "f2  w");  
        }
        //FLOOR 3
        if (destination == "354" || destination == "356"){
            location.setAttribute("destination", "f3 ne");
        }
        if (destination == "317" || destination == "315" || destination == "313" || destination == "332" || destination == "334" || destination == "336" ||
        destination == "338" || destination == "342" || destination == "344" || destination == "348" || destination == "350" || destination == "352"){
            location.setAttribute("destination", "f3 ne");
            //turn left
        }
        if (destination == "319" || destination == "321" || destination == "323" || destination == "325"){
            location.setAttribute("destination", "f3  w");  
        }
        if (destination == "307" || destination == "328" || destination == "326" || destination == "324" || destination == "322" || destination == "318" ||
        destination == "316" || destination == "312" || destination == "310" || destination == "308"){
            location.setAttribute("destination", "f3  e");
        }
        if (destination == "301"){
            location.setAttribute("destination", "f3 se");  
        }   
    }
    //NW ENTRANCE
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
    //SW ENTRANCE
    if (entrance == "f1 sw"){
        //FLOOR 1
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
        if (destination == "154" || destination == "156"){
            location.setAttribute("destination", "f1 nw");
        }
        if (destination == "101" || destination == "103" || destination == "112" || destination == "116" || destination == "118" || destination == "122" ||
        destination == "124" || destination == "126" || destination == "128"){
            location.setAttribute("destination", "f1 se");
        }
        
    }
    //SE ENTRANCE
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
        if (destination == "154" || destination == "156"){
            location.setAttribute("destination", "f1 ne");
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
                            path[i] = "Turn Right";
                            path[i+1] = "Go Straight";
                            if(path[i+2].includes("ne")){
                                path[i+2] = "Turn Left";
                            }
                            if(path[i+2] != null && path[i+2].includes("w",4)){
                                path[i+2] = "Turn Left";
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
                        }
                        if (path[i+2] != null && path[i+2].includes("ne") && path[i].charAt(1) === path[i+1].charAt(1)){//if "e" is not the destination
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
                    path[i+1] = "Turn Left";
                    if(path[i+2].includes("e", 4)){
                        path[i+2] = "Go Straight";
                    }
                }
                //midpoint
                if (path[i+1] != null && path[i+1].includes("w",4)){
                    path[i] = "Turn Left";
                    path[i+1] = "Go Straight";
                    if(path[i+2] != null && path[i+2].includes("nw")){
                        path[i+2] = "Go Straight";
                        path.length+=1;
                        path[i+3] = "Turn Right";
                        
                    }
                }
            }
        }
 
        //STAIRS
        /* if (path[i] != null && path[i].charAt(3) === path[i+1].charAt(3) && path[i].charAt(4) === (path[i+1].charAt(4))){
            if(path[i].charAt(1) < path[i+1].charAt(1)) {
                path[i] = "Go Upstairs";
            }else{
                path[i] = "Go Downstairs";
            }
        }*/
            
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












       
       
