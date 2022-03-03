<?php
  //UPDATE FOR CARDINAL DIRECT DB 
    $servername='localhost';
    $username='root';
    $password='';
    $dbname = "cardinaldirect";

    //create connection
    $conn=mysqli_connect($servername,$username,$password,$dbname);
    //check connection
      if(!$conn){
          die('Could not Connect MySql Server:' .mysqli_connect_error());
        }
?>