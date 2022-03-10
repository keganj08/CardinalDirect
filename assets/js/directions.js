wsc.createEdges();
wsc.runDijkstra("f1 sw");
let path = wsc.getPathTo("f3 ne");
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
//formatting
var num = 1;
for (let i = 0; i < path.length; i++){
    path[i] = '<br>' + num + ". "+path[i];
    num++;
    path[path.length-1] = '<br>'+ (num-1) + ". Arrived!";
}
//print directions
document.getElementById ("currentInstruction").innerHTML= "Directions:" + path;