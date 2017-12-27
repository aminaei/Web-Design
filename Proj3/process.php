<?php
include('validations_functions.php');
// include('confirmation.php');

// echo " ---> Processing Form <---- ";

$pass = false;
$pass = IsEmptyFields();
if($pass){
  $params = SanitizingData($_POST);
}
$pass = validate_zip($params);
$pass = validate_phone($params);


if($pass){
$db = db_connect();

$category = $_POST["category"];
$experience_lvl = $_POST["elevel"];
$fname = $_POST["fname"];
$mname = $_POST["middlename"];
$lname = $_POST["lname"];
$dt = strtotime($_POST['day']." ".$_POST['month']." ".$_POST['year']);
$gender = $_POST["gender"];
$address = $_POST["address"] . $_POST["address2"];
$city = $_POST["city"];
$state = $_POST["state"];
$zip = $_POST["zip"];
$pnumber = $_POST["area_phone"].$_POST["prefix_phone"].$_POST["phone"];
$email = $_POST["email"];
$medical_con = $_POST["textarea"];

// echo "<br />";
$dob = date("Y-m-d",$dt);
// echo "dt = ".$dob;
// echo "<br />";
// echo "Entering form Data to MYSQL dataBase...";
// Perform database query
// $query = "SELECT * FROM subjects";

$query= "INSERT INTO runner(id,category,experience,fname,mname,lname,birthdate,gender,address,city,state,zip,phnumber,email,textarea) VALUES (0,'{$category}','{$experience_lvl}','{$fname}','{$mname}','{$lname}','{$dob}','{$gender}','{$address}','{$city}','{$state}','{$zip}','{$pnumber}','{$email}','{$medical_con}')";


$result = mysqli_query($db, $query);

$UPLOAD_DIR = '_uploadDIR_/';
$COMPUTER_DIR = '/home/am/Sites/Newproj3/_uploadDIR_/';
$tmp_name = $_FILES["photograph"]["tmp_name"];
$uploadfilename = $_FILES["photograph"]["name"];
$saveddate = date("mdy-Hms");
$newfilename = $UPLOAD_DIR.$lname."_".$fname."_".$uploadfilename;
$uploadurl = 'http://'.$_SERVER['SERVER_NAME'].dirname($_SERVER['REQUEST_URI']).'/'.$newfilename;

if (move_uploaded_file($tmp_name, $newfilename)):
  $msg = "File uploaded";
else:
  $msg = "Sorry, couldn't upload your profile picture".$_FILES['photograph']['error'];
  $formerrors = true;
endif; //move uploaded file

// Test if there was a query error
if($result){
  // echo "<br />";
  // echo "Sucess!!";
  // echo "<br />";
  include('confirm_Img.php');
}else{
  //Failure
  // $message = "Subject creation failed"
  echo "Failed !!!";
  die("Database query failed. " . mysql_error($db));
}

close_connector($db);
}





 ?>
