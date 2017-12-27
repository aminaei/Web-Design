
<?php
  include('validations_functions.php');
  // 1. Connect to the database connection
  $dbhost = 'localhost';
  $dbuser = 'al';
  $dbpass = 'sweet';
  $dbname = 'jadrn030';
  $db = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

  if(!($db))
      echo "ERROR in connection ".mysqli_error($db);
  //Test if connection octicon-issue-reopened

 ?>




<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Form Processing</title>
  </head>
  <body>
    <?php echo " -- Processing Form data -- "; ?><br/>
    <pre>
      <?php
        // print_r($_POST)


        $formData = array();
        $formData = $_POST;
        $formReport = array();
        // print_r($formData['email']);
        // echo "<br />";
        // echo "type of zip = ".gettype($formData['zip']);
        // echo "<br />";

        foreach ($formData as $key => $value) {
          if(has_presence($value)||($key == middlename)||($key == address2)||($key == textarea)){
            $formReport[$key] = $value;
            // echo " -->key:  ";echo $key; echo "  =>  "; echo $value;
            // echo "<br />";
          }
          else {
            $formReport[$key] = "Error: Empty Field";
            echo "Invalid ";echo $key;echo " => ";echo $value;
            echo "<br />";
          }

        }
        // var_dump($formReport);


        // echo " *** date:  " . $formData['year'];

        // Validate Birth date
        $d1 = date_create("NOW");
        $dob = $formData['year']."-".$formData['month']."-".$formData['day'];
        $d2 = date_create($dob);
        $diff = date_diff($d1,$d2);
        if($diff->y < 18){
          $formReport['DOB'] = "Invalid Year: ". $diff->y . " years old, must be 18 or older!";
          echo "<br />";
          echo "Invalid Year: ". $diff->y . " years old, must be 18 or older!";
          echo "<br />";
        }
        // else{
        //   echo "<br />";
        //   echo "Difference is " . $diff->y . " years!";
        //   echo "<br />";
        // }

        // echo $formData['month']."-".$formData['day']."-".$formData['year'];
        $t = strtotime($formData['day']." ".$formData['month']." ".$formData['year']);
        echo "<br />";
        echo " t = ".date("F-d-Y",$t);
        if(date("F-j-Y",$t) != $formData['month']."-".$formData['day']."-".$formData['year']){
          $formReport['DOB'] = " Invalid Birth Date Entry: ".date("m-d-Y",$t);
          echo "<br />";
          echo " --> t = ".date("m-d-Y",$t);
        }
        // else{
        //   echo "<br />";
        //   echo "Invalid Date....";
        // }

        // Validate zip
        if(!is_numeric($formData['zip']) || strlen($formData['zip'])!=5){
          $formReport['zip'] = "Invalid zip code";
          echo "<br />";
          echo " --> ERROR: zip is Not Valid = ".$formData['zip'];
          echo "<br />";
        }
        // Validate Phone number
        if(!is_numeric($formData['area_phone']) || strlen($formData['area_phone'])!=3){
          $formReport['area_phone'] = "Invalid Area code";
          echo "<br />";
          echo " --> ERROR: Area is Not Valid = ".$formData['area_phone'];
          echo "<br />";
        }
        if(!is_numeric($formData['prefix_phone']) || strlen($formData['prefix_phone'])!=3){
          $formReport['prefix_phone'] = "Invalid Area code";
          echo "<br />";
          echo " --> ERROR: Area is Not Valid = ".$formData['prefix_phone'];
          echo "<br />";
        }
        if(!is_numeric($formData['phone']) || strlen($formData['phone'])!=4){
          $formReport['phone'] = "Invalid Area code";
          echo "<br />";
          echo " --> ERROR: Area is Not Valid = ".$formData['phone'];
          echo "<br />";
        }

        // var_dump($formReport);


       ?>
    </pre>
    <br />
    <?php
    // Variables From POST
    $category = $formData["category"];
    $experience_lvl = $formData["elevel"];
    $fname = $formData["fname"];
    $mname = $formData["middlename"];
    $lname = $formData["lname"];
    $dt = strtotime($formData['day']." ".$formData['month']." ".$formData['year']);
    // $dob = $formData["year"] . $formData["month"] . $formData["day"];
    $gender = $formData["gender"];
    $address = $formData["address"] . $formData["address2"];
    $city = $formData["city"];
    $state = $formData["state"];
    $zip = $formData["zip"];
    $pnumber = $formData["area_phone"].$formData["prefix_phone"].$formData["phone"];
    $email = $formData["email"];
    $medical_con = $formData["textarea"];

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
