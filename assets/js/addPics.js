//file to add all pics to the floors/intersection data structure

//ex:
//create floor
let floor0 = new Floor();

//create bottom left intersection 
let f0botLeft = new Intersection(path1, path2, path3, path4); //different paths representing the pictures at the intersection

//add intersection to floor
floor0.addIntersection(f0botLeft, botLeft);

//get particular intersection from a floor
floor0.getIntersection(botLeft);

//getpic from intersection
f0botLeft.getPic(north);
