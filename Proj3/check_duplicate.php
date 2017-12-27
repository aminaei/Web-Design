<?php
  // 1. Connect to the database connection
  $server = 'localhost';
  $dbuser = 'al';
  $dbpass = 'sweet';
  $dbname = 'jadrn030';
  $db = mysqli_connect($server, $dbuser, $dbpass, $dbname);

  // echo "<br />";
  // echo " Insdie of check_duplicate.php !!!";
  // echo "<br />";

  //Test if connection octicon-issue-reopened
  if(!($db))
    echo "ERROR in connection ".mysqli_error($db);


$email =$_GET['email'];
$sql_email = "select * from runner where email='$email';";
mysqli_query($db, $sql_email);
$how_many_email = mysqli_affected_rows($db);

$fname =$_GET['fname'];
$sql_fname = "select * from runner where fname='$fname';";
mysqli_query($db, $sql_fname);
$how_many_fname = mysqli_affected_rows($db);

$lname =$_GET['lname'];
$sql_lname = "select * from runner where lname='$lname';";
mysqli_query($db, $sql_lname);
$how_many_lname = mysqli_affected_rows($db);

mysqli_close($db);
// if(($how_many_email > 0)&&(($how_many_fname > 0)||($how_many_lname > 0)))
if($how_many_email > 0)
    echo "dup";
// else if(($how_many_email == 0)&&(($how_many_fname == 0)||($how_many_lname == 0)))
else if($how_many_email == 0)
    echo "OK";
else
    echo "ERROR, failure ".$how_many_email;
 ?>
