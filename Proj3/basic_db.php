
<?php
  echo "<br />";
  echo " -- connecting to db -- ";
  echo "<br />";
  // 1. Connect to the database connection
  $dbhost = 'localhost';
  $dbuser = 'al';
  $dbpass = 'sweet';
  $dbname = 'jadrn030';
  $db = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

  if(!($db))
      echo "ERROR in connection ".mysqli_error($db);
  //Test if connection octicon-issue-reopened
  echo "<br />";
  echo " -- EOF connecting to db -- ";
  echo "<br />";

 ?>




<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html;
  charset=iso-8859-1" />
  <title>Sample Form Processing with PHP</title>
<link rel="stylesheet" type="text/css" href="style.css" />


</head>

  <body>
    <?php echo " -- Processing Form data -- "; ?><br/>
    <br />
    <?php
    // Variables From POST
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

    echo "<br />";
    $dob = date("Y-m-d",$dt);
    echo "dt = ".$dob;
    echo "<br />";
    echo "Entering form Data to MYSQL dataBase...";
    // Perform database query
    // $query = "SELECT * FROM subjects";

    $query= "INSERT INTO runner(id,category,experience,fname,mname,lname,birthdate,gender,address,city,state,zip,phnumber,email,textarea)
            VALUES (0,'{$category}','{$experience_lvl}','{$fname}','{$mname}','{$lname}','{$dob}','{$gender}','{$address}','{$city}','{$state}','{$zip}','{$pnumber}','{$email}','{$medical_con}')";

    echo "<br />";
    echo $query;

    $result = mysqli_query($db, $query);
    echo "<br />";
    echo " mysql result = ".$result;
    echo "<br />";
    mysqli_close($db);
    // Test if there was a query error
    if($result){
      // Success
      // redirect_to("page.php");
      echo "Sucess!!";
    }else{
      //Failure
      // $message = "Subject creation failed"
      die("Database query failed. " . mysql_error($db));
    }

     ?>

  </body>
</html>
