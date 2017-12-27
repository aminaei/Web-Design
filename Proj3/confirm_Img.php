<?php
$UPLOAD_DIR = '_uploadDIR_/';
$COMPUTER_DIR = '/home/am/Sites/Newproj3/_uploadDIR_/';
$fname = $_FILES['photograph']['name'];
$pname = $_POST['lname']."_".$_POST['fname']."_".$_FILES['photograph']['name'];
echo "<img src=\"$UPLOAD_DIR/$pname\""." width='200px' />";
// $d = dir($COMPUTER_DIR);
// while($fname = $d->read()) {
//   $data[$fname] = stat($fname);
// }
// foreach($data as $fname => $fvalue) {
//   // echo "===>".$fname." ===> ".$fbalue;
//   // echo "<br />";
//   if($fname == "." || $fname == "..") {
//     ;
//   }
//   else {
//     echo "<img src=\"$UPLOAD_DIR/$pname\""." width='200px' />";
//   }
// }
?>
<?php
if(isset($_POST['fname'])) {$fname = $_POST['fname'];}
if(isset($_POST['mname'])) {$mname = $_POST['mname'];}
if(isset($_POST['lname'])) {$lname = $_POST['lname'];}
if(isset($_POST['category'])) {$category = $_POST['category'];}
if(isset($_POST['elevel'])) {$exp = $_POST['elevel'];}
if(isset($_POST['gender'])) {$gender = $_POST['gender'];}
if(isset($_POST['month'])) {$month = $_POST['month'];}
if(isset($_POST['day'])) {$day = $_POST['day'];}
if(isset($_POST['year'])) {$year = $_POST['year'];}
if(isset($_POST['state'])) {$state = $_POST['state'];}
if(isset($_POST['address'])) {$address = $_POST['address'];}
if(isset($_POST['address2'])) {$address2 = $_POST['address2'];}
if(isset($_POST['city'])) {$city = $_POST['city'];}
if(isset($_POST['zip'])) {$zip = $_POST['zip'];}
if(isset($_POST['area_phone'])) {$area_code = $_POST['area_phone'];}
if(isset($_POST['prefix_phone'])) {$prefix_phone = $_POST['prefix_phone'];}
if(isset($_POST['phone'])) {$phone = $_POST['phone'];}
if(isset($_POST['email'])) {$email = $_POST['email'];}
if(isset($_POST['textarea'])) {$textarea = $_POST['textarea'];}

 ?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
   <meta http-equiv="Content-Type" content="text/html;
   charset=iso-8859-1" />
   <title>Sample Form Processing with PHP</title>
<link rel="stylesheet" type="text/css" href="style.css" />
<link rel="stylesheet" type="text/css" href="report.css" />


</head>


<body>
   <h1><?php echo "$fname $lname"; ?>, Thank you for registering.</h1>
   <table>
       <tr>
           <td>Category</td>
           <td><?php echo "$category"; ?></td>
       </tr>
       <tr>
           <td>Experience level</td>
           <td><?php echo "$exp"; ?></td>
       </tr>
       <tr>
           <td>Gender</td>
           <td><?php echo "$gender"; ?></td>
       </tr>
       <tr>
           <td>Birth Date</td>
           <td><?php echo "$month - $day - $year"; ?></td>
       </tr>

       <tr>
           <td>Address</td>
           <td><?php echo "$address"; ?></td>
       </tr>
       <tr>
           <td>City</td>
           <td><?php echo "$city"; ?></td>
       </tr>
       <tr>
           <td>State</td>
           <td><?php echo "$state"; ?></td>
       </tr>
       <tr>
           <td>Zip Code</td>
           <td><?php echo "$zip"; ?></td>
       </tr>
       <tr>
           <td>Phone Number</td>
           <td><?php echo "$area_code - $prefix_phone - $phone"; ?></td>
       </tr>
       <tr>
           <td>email</td>
           <td><?php echo "$email"; ?></td>
       </tr>

   </table>
 </body>
 </html>
