//js file to set flags of all images
//this js file is linked to interior html page at the moment, should probably move reference to js script?
//alert("js connected");
/*
var image = document.createElement('img');
//image.src='assets/images/building interiors/CarnegieEntry-example.jpg';

image.setAttribute("upStairs","true");
image.setAttribute("downStairs","true");
image.setAttribute("forward","true");
image.setAttribute("left","false");
image.setAttribute("right","false");
image.setAttribute("backward","false");
//set attribute for what classroom number(s) is in picture frame
image.setAttribute("leftRooms", "101, 202");
image.setAttribute("rightRooms", "101, 202");
//console.log(image.attributes);
//console.log(image.attributes.leftRooms);

image.setAttribute("forwardClick", "/picPath");

//attributes will be in attribute.value (upStairs.value)
//console.log(E_east.attributes.forward.value); //this is how to grab specific value
//console.log(E_east.getAttribute(upStairs));
*/






//var naming convention - floor_intersection_direction





//--------------------------------------------------------------------------------------------------------------------
//FLOOR 1  ***********************************************************************************************************
//--------------------------------------------------------------------------------------------------------------------

//NE intersection
var F1_NE_west = document.createElement('img'); //*******************************
F1_NE_west.src='assets/images/building interiors/floor1/ne_intersection/west.jpg';
//left
F1_NE_west.setAttribute("leftImg", "assets/images/building interiors/floor1/ne_intersection/south.jpg");
F1_NE_west.setAttribute("leftVar", "F1_NE_south");
//forward
F1_NE_west.setAttribute("forwardImg", "assets/images/building interiors/floor1/nw_intersection/west.jpg");
F1_NE_west.setAttribute("forwardVar", "F1_NW_west");
//rooms
F1_NE_west.setAttribute("leftRooms", " ");
F1_NE_west.setAttribute("rightRooms", "154, 156");

var F1_NE_south = document.createElement('img'); //*******************************
F1_NE_south.src='assets/images/building interiors/floor1/ne_intersection/south.jpg';
//right
F1_NE_south.setAttribute("rightImg", "assets/images/building interiors/floor1/ne_intersection/west.jpg");
F1_NE_south.setAttribute("rightVar", "F1_NE_west");
//forward
F1_NE_south.setAttribute("forwardImg", "assets/images/building interiors/floor1/e_intersection/south.jpg");
F1_NE_south.setAttribute("forwardVar", "F1_E_south");
//rooms
F1_NE_south.setAttribute("leftRooms", "150, 148, 144, 142, 138, 136, 134, 132");
F1_NE_south.setAttribute("rightRooms", "111, 109, 107");

var F1_NE_north = document.createElement('img'); //*******************************
F1_NE_north.src='assets/images/building interiors/floor1/ne_intersection/south.jpg';
//backward
F1_NE_north.setAttribute("backwardImg", "assets/images/building interiors/floor1/e_intersection/north.jpg");
F1_NE_north.setAttribute("backwardVar", "F1_E_north");
//left
F1_NE_north.setAttribute("leftImg", "assets/images/building interiors/floor1/ne_intersection/west.jpg");
F1_NE_north.setAttribute("leftVar", "F1_NE_west");
//upstairs
F1_NE_north.setAttribute("upImg", "assets/images/building interiors/floor2/ne_intersection/west.jpg");
F1_NE_north.setAttribute("upVar", "F2_NE_west");
//downstairs
F1_NE_north.setAttribute("downImg", "assets/images/building interiors/floor0/ne_intersection/west.jpg");
F1_NE_north.setAttribute("downVar", "F0_NE_west");
//rooms
F1_NE_north.setAttribute("leftRooms", "144, 148, 150");
F1_NE_north.setAttribute("rightRooms", " ");

var F1_NE_east = document.createElement('img'); //*******************************
F1_NE_east.src='assets/images/building interiors/floor1/ne_intersection/east.jpg';
//right
F1_NE_east.setAttribute("rightImg", "assets/images/building interiors/floor1/ne_intersection/south.jpg");
F1_NE_east.setAttribute("rightVar", "F1_NE_south");
//backward
F1_NE_east.setAttribute("backwardImg", "assets/images/building interiors/floor1/nw_intersection/east.jpg");
F1_NE_east.setAttribute("backwardVar", "F1_NW_east");
//upstairs
F1_NE_east.setAttribute("upImg", "assets/images/building interiors/floor2/ne_intersection/west.jpg");
F1_NE_east.setAttribute("upVar", "F2_NE_west");
//downstairs
F1_NE_east.setAttribute("downImg", "assets/images/building interiors/floor0/ne_intersection/west.jpg");
F1_NE_east.setAttribute("downVar", "F0_NE_west");
//rooms
F1_NE_east.setAttribute("leftRooms", "154");
F1_NE_east.setAttribute("rightRooms", " ");


//---------------------------------------------------
//NW intersection
//---------------------------------------------------
var F1_NW_east = document.createElement('img');  //*******************************
F1_NW_east.src='assets/images/building interiors/floor1/nw_intersection/east.jpg';
//forward
F1_NW_east.setAttribute("forwardImg", "assets/images/building interiors/floor1/ne_intersection/east.jpg");
F1_NW_east.setAttribute("forwardVar", "F1_NE_east");
//right
F1_NW_east.setAttribute("rightImg", "assets/images/building interiors/floor1/nw_intersection/south.jpg");
F1_NW_east.setAttribute("rightVar", "F1_NW_south");
//rooms
F1_NW_east.setAttribute("leftRooms", "156, 154");
F1_NW_east.setAttribute("rightRooms", " ");

var F1_NW_south = document.createElement('img');  //*******************************
F1_NW_south.src='assets/images/building interiors/floor1/nw_intersection/south.jpg';
//left
F1_NW_south.setAttribute("leftImg", "assets/images/building interiors/floor1/nw_intersection/east.jpg");
F1_NW_south.setAttribute("leftVar", "F1_NW_east");
//forward
F1_NW_south.setAttribute("forwardImg", "assets/images/building interiors/floor1/w_intersection/south.jpg");
F1_NW_south.setAttribute("forwardVar", "F1_W_south");
//rooms
F1_NW_south.setAttribute("leftRooms", "113, 115");
F1_NW_south.setAttribute("rightRooms", " ");

var F1_NW_north = document.createElement('img');  //*******************************
F1_NW_north.src='assets/images/building interiors/floor1/nw_intersection/north.jpg';
//backward
F1_NW_north.setAttribute("backwardImg", "assets/images/building interiors/floor1/w_intersection/north.jpg");
F1_NW_north.setAttribute("backwardVar", "F1_W_north");
//right
F1_NW_north.setAttribute("rightImg", "assets/images/building interiors/floor1/nw_intersection/east.jpg");
F1_NW_north.setAttribute("rightVar", "F1_NW_east");
//rooms
F1_NW_north.setAttribute("leftRooms", " ");
F1_NW_north.setAttribute("rightRooms", " ");

var F1_NW_west = document.createElement('img');  //*******************************
F1_NW_west.src='assets/images/building interiors/floor1/nw_intersection/west.jpg';
//backward
F1_NW_west.setAttribute("backwardImg", "assets/images/building interiors/floor1/ne_intersection/west.jpg");
F1_NW_west.setAttribute("backwardVar", "F1_NE_west");
//left
F1_NW_west.setAttribute("leftImg", "assets/images/building interiors/floor1/nw_intersection/south.jpg");
F1_NW_west.setAttribute("leftVar", "F1_NW_south");
//rooms
F1_NW_west.setAttribute("leftRooms", " ");
F1_NW_west.setAttribute("rightRooms", "156");

//---------------------------------------------------
//SE intersection
//---------------------------------------------------
var F1_SE_west = document.createElement('img');  //*******************************
F1_SE_west.src='assets/images/building interiors/floor1/se_intersection/west.jpg';
//forward
F1_SE_west.setAttribute("forwardImg", "assets/images/building interiors/floor1/sw_intersection/west.jpg");
F1_SE_west.setAttribute("forwardVar", "F1_SW_west");
//right
F1_SE_west.setAttribute("rightImg", "assets/images/building interiors/floor1/se_intersection/north.jpg");
F1_SE_west.setAttribute("rightVar", "F1_SE_north");
//rooms
F1_SE_west.setAttribute("leftRooms", "106, 104");
F1_SE_west.setAttribute("rightRooms", " ");

var F1_SE_east = document.createElement('img');  //*******************************
F1_SE_east.src='assets/images/building interiors/floor1/se_intersection/east.jpg';
//backward
F1_SE_east.setAttribute("backwardImg", "assets/images/building interiors/floor1/sw_intersection/east.jpg");
F1_SE_east.setAttribute("backwardVar", "F1_SW_east");
//left
F1_SE_east.setAttribute("leftImg", "assets/images/building interiors/floor1/se_intersection/north.jpg");
F1_SE_east.setAttribute("leftVar", "F1_SE_north");
//upstairs
F1_SE_east.setAttribute("upImg", "assets/images/building interiors/floor2/se_intersection/west.jpg");
F1_SE_east.setAttribute("upVar", "F2_SE_west");
//downstairs
F1_SE_east.setAttribute("downImg", "assets/images/building interiors/floor0/se_intersection/west.jpg");
F1_SE_east.setAttribute("downVar", "F0_SE_west");
//rooms
F1_SE_east.setAttribute("leftRooms", " ");
F1_SE_east.setAttribute("rightRooms", "106, 112");

var F1_SE_south = document.createElement('img');  //*******************************
F1_SE_south.src='assets/images/building interiors/floor1/se_intersection/south.jpg';
//backward
F1_SE_south.setAttribute("backwardImg", "assets/images/building interiors/floor1/e_intersection/south.jpg");
F1_SE_south.setAttribute("backwardVar", "F1_E_south");
//right
F1_SE_south.setAttribute("rightImg", "assets/images/building interiors/floor1/se_intersection/west.jpg");
F1_SE_south.setAttribute("rightVar", "F1_SE_west");
//rooms
F1_SE_south.setAttribute("leftRooms", "112");
F1_SE_south.setAttribute("rightRooms", " ");

var F1_SE_north = document.createElement('img');  //*******************************
F1_SE_north.src='assets/images/building interiors/floor1/se_intersection/north.jpg';
//forward
F1_SE_north.setAttribute("forwardImg", "assets/images/building interiors/floor1/e_intersection/north.jpg");
F1_SE_north.setAttribute("forwardVar", "F1_E_north");
//left
F1_SE_north.setAttribute("leftImg", "assets/images/building interiors/floor1/se_intersection/west.jpg");
F1_SE_north.setAttribute("leftVar", "F1_SE_west");
//upstairs
F1_SE_north.setAttribute("upImg", "assets/images/building interiors/floor2/se_intersection/west.jpg");
F1_SE_north.setAttribute("upVar", "F2_SE_west");
//downstairs 
F1_SE_north.setAttribute("downImg", "assets/images/building interiors/floor0/se_intersection/west.jpg");
F1_SE_north.setAttribute("downVar", "F0_SE_west");
//rooms
F1_SE_north.setAttribute("leftRooms", "103, 101");
F1_SE_north.setAttribute("rightRooms", "116, 118, 122, 124, 126, 128");


//---------------------------------------------------
//SW intersection
//---------------------------------------------------
var F1_SW_east = document.createElement('img'); //*******************************
F1_SW_east.src='assets/images/building interiors/floor1/sw_intersection/east.jpg';
//forward
F1_SW_east.setAttribute("forwardImg", "assets/images/building interiors/floor1/se_intersection/east.jpg");
F1_SW_east.setAttribute("forwardVar", "F1_SE_east");
//left
F1_SW_east.setAttribute("leftImg", "assets/images/building interiors/floor1/sw_intersection/north.jpg");
F1_SW_east.setAttribute("leftVar", "F1_SW_north");
//rooms
F1_SW_east.setAttribute("leftRooms", " ");
F1_SW_east.setAttribute("rightRooms", "104, 106");

var F1_SW_north = document.createElement('img'); //*******************************
F1_SW_north.src='assets/images/building interiors/floor1/sw_intersection/north.jpg';
//forward
F1_SW_north.setAttribute("forwardImg", "assets/images/building interiors/floor1/w_intersection/north.jpg");
F1_SW_north.setAttribute("forwardVar", "F1_W_north");
//right
F1_SW_north.setAttribute("rightImg", "assets/images/building interiors/floor1/sw_intersection/east.jpg");
F1_SW_north.setAttribute("rightVar", "F1_SW_east");
//rooms
F1_SW_north.setAttribute("leftRooms", " ");
F1_SW_north.setAttribute("rightRooms", "101, 121, 119");

var F1_SW_west = document.createElement('img'); //*******************************
F1_SW_north.src='assets/images/building interiors/floor1/sw_intersection/west.jpg';
//backward
F1_SW_west.setAttribute("backwardImg", "assets/images/building interiors/floor1/se_intersection/west.jpg");
F1_SW_west.setAttribute("backwardVar", "F1_SE_west");
//right
F1_SW_west.setAttribute("rightImg", "assets/images/building interiors/floor1/sw_intersection/north.jpg");
F1_SW_west.setAttribute("rightVar", "F1_SW_north");
//rooms
F1_SW_west.setAttribute("leftRooms", " ");
F1_SW_west.setAttribute("rightRooms", " ");

var F1_SW_south = document.createElement('img'); //*******************************
F1_SW_north.src='assets/images/building interiors/floor1/sw_intersection/south.jpg';
//backward
F1_SW_south.setAttribute("backwardImg", "assets/images/building interiors/floor1/w_intersection/south.jpg");
F1_SW_south.setAttribute("backwardVar", "F1_W_south");
//left
F1_SW_south.setAttribute("leftImg", "assets/images/building interiors/floor1/sw_intersection/east.jpg");
F1_SW_south.setAttribute("leftVar", "F1_SW_east");
//rooms
F1_SW_south.setAttribute("leftRooms", "101");
F1_SW_south.setAttribute("rightRooms", " ");



//---------------------------------------------------
//E intersection
//---------------------------------------------------
var F1_E_east = document.createElement('img'); //*******************************
F1_E_east.src='assets/images/building interiors/floor1/e_intersection/east.jpg';
//backward
F1_E_east.setAttribute("backwardImg", "assets/images/building interiors/floor1/w_intersection/east.jpg");
F1_E_east.setAttribute("backwardVar", "F1_W_east");
//right
F1_E_east.setAttribute("rightImg", "assets/images/building interiors/floor1/e_intersection/south.jpg");
F1_E_east.setAttribute("rightVar", "F1_E_south");
//left
F1_E_east.setAttribute("leftImg", "assets/images/building interiors/floor1/e_intersection/north.jpg");
F1_E_east.setAttribute("leftVar", "F1_E_north");
//rooms
F1_E_east.setAttribute("leftRooms", " ");
F1_E_east.setAttribute("rightRooms", " ");

var F1_E_south = document.createElement('img'); //*******************************
F1_E_south.src='assets/images/building interiors/floor1/e_intersection/south.jpg';
//forward
F1_E_south.setAttribute("forwardImg", "assets/images/building interiors/floor1/se_intersection/south.jpg");
F1_E_south.setAttribute("forwardVar", "F1_SE_south");
//backward
F1_E_south.setAttribute("backwardImg", "assets/images/building interiors/floor1/ne_intersection/south.jpg");
F1_E_south.setAttribute("backwardVar", "F1_NE_south");
//right
F1_E_south.setAttribute("rightImg", "assets/images/building interiors/floor1/e_intersection/west.jpg");
F1_E_south.setAttribute("rightVar", "F1_E_west");
//rooms
F1_E_south.setAttribute("leftRooms", "128, 126, 124, 122, 118, 116, 112");
F1_E_south.setAttribute("rightRooms", "103, 101");

var F1_E_north = document.createElement('img'); //*******************************
F1_E_north.src='assets/images/building interiors/floor1/e_intersection/north.jpg';
//backward
F1_E_north.setAttribute("backwardImg", "assets/images/building interiors/floor1/se_intersection/north.jpg");
F1_E_north.setAttribute("backwardVar", "F1_SE_north");
//forward
F1_E_north.setAttribute("forwardImg", "assets/images/building interiors/floor1/ne_intersection/north.jpg");
F1_E_north.setAttribute("forwardVar", "F1_NE_north");
//left
F1_E_north.setAttribute("leftImg", "assets/images/building interiors/floor1/e_intersection/west.jpg");
F1_E_north.setAttribute("leftVar", "F1_E_west");
//rooms
F1_E_north.setAttribute("leftRooms", "107, 109, 111");
F1_E_north.setAttribute("rightRooms", "132, 134, 136, 138, 142, 144, 148, 150");

var F1_E_west = document.createElement('img'); //*******************************
F1_E_west.src='assets/images/building interiors/floor1/e_intersection/west.jpg';
//forward
F1_E_west.setAttribute("forwardImg", "assets/images/building interiors/floor1/w_intersection/west.jpg");
F1_E_west.setAttribute("forwardVar", "F1_W_west");
//left
F1_E_west.setAttribute("leftImg", "assets/images/building interiors/floor1/e_intersection/south.jpg");
F1_E_west.setAttribute("leftVar", "F1_E_south");
//right
F1_E_west.setAttribute("rightImg", "assets/images/building interiors/floor1/e_intersection/north.jpg");
F1_E_west.setAttribute("rightVar", "F1_E_north");
//rooms
F1_E_west.setAttribute("leftRooms", " ");
F1_E_west.setAttribute("rightRooms", " ");


//---------------------------------------------------
//W intersection
//---------------------------------------------------
var F1_W_east = document.createElement('img'); //*******************************
F1_W_east.src='assets/images/building interiors/floor1/w_intersection/east.jpg';
//forward
F1_W_east.setAttribute("forwardImg", "assets/images/building interiors/floor1/e_intersection/east.jpg");
F1_W_east.setAttribute("forwardVar", "F1_E_east");
//left
F1_W_east.setAttribute("leftImg", "assets/images/building interiors/floor1/w_intersection/north.jpg");
F1_W_east.setAttribute("leftVar", "F1_W_north");
//right
F1_W_east.setAttribute("rightImg", "assets/images/building interiors/floor1/w_intersection/south.jpg");
F1_W_east.setAttribute("rightVar", "F1_W_south");
//rooms
F1_W_east.setAttribute("leftRooms", " ");
F1_W_east.setAttribute("rightRooms", " ");

var F1_W_west = document.createElement('img'); //*******************************
F1_W_west.src='assets/images/building interiors/floor1/w_intersection/west.jpg';
//backward
F1_W_west.setAttribute("backwardImg", "assets/images/building interiors/floor1/e_intersection/west.jpg");
F1_W_west.setAttribute("backwardVar", "F1_E_west");
//right
F1_W_west.setAttribute("rightImg", "assets/images/building interiors/floor1/W_intersection/north.jpg");
F1_W_west.setAttribute("rightVar", "F1_W_north");
//left
F1_W_west.setAttribute("leftImg", "assets/images/building interiors/floor1/W_intersection/south.jpg");
F1_W_west.setAttribute("leftVar", "F1_W_south");
//rooms
F1_W_west.setAttribute("leftRooms", " ");
F1_W_west.setAttribute("rightRooms", " ");

var F1_W_south = document.createElement('img'); //*******************************
F1_W_south.src='assets/images/building interiors/floor1/w_intersection/south.jpg';
//forward
F1_W_south.setAttribute("forwardImg", "assets/images/building interiors/floor1/sw_intersection/south.jpg");
F1_W_south.setAttribute("forwardVar", "F1_SW_south");
//backward
F1_W_south.setAttribute("backwardImg", "assets/images/building interiors/floor1/nw_intersection/south.jpg");
F1_W_south.setAttribute("backwardVar", "F1_NW_south");
//left
F1_W_south.setAttribute("leftImg", "assets/images/building interiors/floor1/w_intersection/east.jpg");
F1_W_south.setAttribute("leftVar", "F1_W_east");
//upstairs
F1_W_south.setAttribute("upImg", "assets/images/building interiors/floor2/w_intersection/east.jpg");
F1_W_south.setAttribute("upVar", "F2_W_east");
//downstairs
F1_W_south.setAttribute("downImg", "assets/images/building interiors/floor0/w_intersection/east.jpg");
F1_W_south.setAttribute("downVar", "F0_W_east");
//rooms
F1_W_south.setAttribute("leftRooms", "119, 121, 101");
F1_W_south.setAttribute("rightRooms", " ");

var F1_W_north = document.createElement('img'); //*******************************
F1_W_north.src='assets/images/building interiors/floor1/w_intersection/north.jpg';
//forward
F1_W_north.setAttribute("forwardImg", "assets/images/building interiors/floor1/nw_intersection/north.jpg");
F1_W_north.setAttribute("forwardVar", "F1_NW_north");
//backward
F1_W_north.setAttribute("backwardImg", "assets/images/building interiors/floor1/sw_intersection/north.jpg");
F1_W_north.setAttribute("backwardVar", "F1_SW_north");
//right
F1_W_north.setAttribute("rightImg", "assets/images/building interiors/floor1/w_intersection/east.jpg");
F1_W_north.setAttribute("rightVar", "F1_W_east");
//rooms
F1_W_north.setAttribute("leftRooms", " ");
F1_W_north.setAttribute("rightRooms", "115, 113");










