//file to create data structure to hold all pictures

/*  x---------------x----------------x
    

    x---------------x----------------x

    4 pictures in each corner? 2 one direction, 2 going the other direction?
    2 pictures each mid x - 1 each direction (bathroom hallway intersections)
    x= points where we have pictures
*/

class Floor{
    constructor(){
        //can change below names based on how we orient building
        this.topLeft = null;
        this.topMid = null;
        this.topRight = null;
        
        this.botLeft = null;
        this.botMid = null;
        this.botRight = null;
    }

    addIntersection(intersection, name){ //is there a better way to do this?
        if(name == "topLeft"){
            this.topLeft == intersection;
        }
        if(name == "topMid"){
            this.topMid == intersection;
        }
        if(name == "topRight"){
            this.topRight == intersection;
        }

        if(name == "botLeft"){
            this.botLeft == intersection;
        }
        if(name == "botMid"){
            this.botMid == intersection;
        }
        if(name == "botRight"){
            this.botLeft == intersection;
        }
    }

    getIntersection(name){ 
        if(name == "topLeft"){
            return this.topLeft;
        }
        if(name == "topMid"){
            return this.topMid;
        }
        if(name == "topRight"){
            return this.topRight;
        }

        if(name == "botLeft"){
            return this.botLeft;
        }
        if(name == "botMid"){
            return this.botMid;
        }
        if(name == "botRight"){
            return this.botRight;
        }
    }
}

//---------
class Intersection{
    //might have to change NSEW based on orientation
    constructor(north, south){//for mid intersections 
        this.north = north;
        this.south = south;
        this.east = null;
        this.west = null;
    }
    constructor(north, south, east, west){ //takes 4 dif parameters, each corner will pass in 4 different picture paths, + what intersection it is
        this.north = north;
        this.south = south;
        this.east = east;
        this.west = west;
    }

    //returns picture fd path, based on what direction of the intersection is passed in
    getPic(direction){
        if(direction == "north"){
            return this.north;
        }
        if(direction == "east"){
            return this.east;
        }
        if(direction == "south"){
            return this.south;
        }
        if(direction == "west"){
            return this.west;
        }
    }
}