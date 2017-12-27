<?php
$UPLOAD_DIR = '_uploadDIR_/';
$COMPUTER_DIR = '/home/am/Sites/Newproj3/_uploadDIR_/';
$fname = $_FILES['photograph']['name'];


if(file_exists("$UPLOAD_DIR".$fname))  {
    echo "<b>Error, the file $fname already exists on the server</b><br />\n";
    }
elseif($_FILES['photograph']['error'] > 0) {
  $err = $_FILES['photograph']['error'];
    echo "Error Code: $err ";
if($err == 1)
echo "The file was too big to upload, the limit is 2MB<br />";
    }
else {
    move_uploaded_file($_FILES['photograph']['tmp_name'], "$UPLOAD_DIR".$fname);
    echo "Success!</br >\n";
    echo "The filename is: ".$fname."<br />";
    echo "The type is: ".$_FILES['photograph']['type']."<br />";
    echo "The size is: ".$_FILES['photograph']['size']."<br />";
    echo "The tmp filename is: ".$_FILES['photograph']['tmp_name']."<br />";
    echo "The basename is: ".basename($fname)."<br />";
}

// foreach($_POST as $key => $val) {
//     echo "Parameter: <b>$key</b> and value: <b>$val</b><br />\n";
// }

?>
