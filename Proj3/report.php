<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Person Report</title>
  <link rel="stylesheet" href="report.css">

</head>
<body>
  <h1>Person Report</h1>
  <?php
  $server = 'localhost';
  $user = 'al';
  $password = 'sweet';
  $database = 'jadrn030';
  $UPLOAD_DIR = '_uploadDIR_/';
  $COMPUTER_DIR = '/home/am/Sites/Newproj3/_uploadDIR_/';

  if(!($db = mysqli_connect($server,$user,$password,$database)))
  echo "ERROR in connection ".mysqli_error($db);
  else {
    // $sql = "select  from runner order by lname;";
    $sql = "select lname,fname,birthdate,experience from runner order by lname;";
    $result = mysqli_query($db, $sql);

    if(!result)
    echo "ERROR in query".mysqli_error($db);
    echo "<table>\n";
    echo "<tr><td>Name</td><td></td><td>Age</td><td>Exprience level</td><td>Photo:</td>";
    while($row=mysqli_fetch_row($result)) {
      $d1 = date_create("NOW");
      $dob = date('Y-m-j',strtotime($row[2]));
      $d2 = date_create($dob);
      $diff = date_diff($d1,$d2);

      $name =  $row[0]."_".$row[1];
      // echo "Age = $row[2]";

      foreach (glob($UPLOAD_DIR."*.*") as $filename) {
        if (preg_match("/$name/i",$filename))
        $fname = $filename;
        //  echo "----> $fname size " . "\n";
      }

      echo "<tr>";
      foreach(array_slice($row,0) as $item){
        if($item == $row[2])
          echo "<td>$diff->y</td>";
        else
          echo "<td>$item</td>";
      }
      if(file_exists("$fname"))  {
        echo "<td><img src=\"$fname\""." width='200px' /></td>";
        $fname = '';
      }
      else
      echo "<td>No Photo. </td>";
      echo "</tr>\n";
    }
    mysqli_close($db);
  }
  ?>
</table>
</body>
</html>
