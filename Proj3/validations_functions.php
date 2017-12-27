<?php
  $bad_chars = array('$','%','?','<','>','php');

  function has_presence($value){
    return isset($value) && $value !== "";
  }

  function db_connect(){
    // 1. Connect to the database connection
    $dbhost = 'localhost';
    $dbuser = 'al';
    $dbpass = 'sweet';
    $dbname = 'jadrn030';
    $db = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    //Test if connection octicon-issue-reopened
    if(mysqli_connect_errno()) {
      die("Database connection failed: " .
          mysqli_connect_errno() .
          " (" . mysqli_connect_errno() . ")"
        );
    }
    return $db;
  }


function close_connector($db) {
    mysqli_close($db);
}

function SanitizingData($formData){
  global $bad_chars;
  $formData = array();
  // var $x;

  $formData['category'] = $_POST['category'];
  $formData['elevel'] = $_POST['elevel'];
  $formData['month'] = $_POST['month'];
  $formData['day'] = $_POST['day'];
  $formData['year'] = $_POST['year'];
  $formData['gender'] = $_POST['gender'];
  $formData['state'] = $_POST['state'];

  $formData['fname'] = filter_var($_POST['fname'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$formData['fname']));

  $formData['mname'] = filter_var($_POST['mname'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['mname']));
  $formData['lname'] = filter_var($_POST['lname'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['lname']));

  $formData['address'] = filter_var($_POST['address'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['address']));

  $formData['address2'] = filter_var($_POST['address2'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['address2']));

  $formData['city'] = filter_var($_POST['city'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['city']));

  $formData['zip'] = filter_var($_POST['zip'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['zip']));

  $formData['area_phone'] = filter_var($_POST['area_phone'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['area_phone']));

  $formData['prefix_phone'] = filter_var($_POST['prefix_phone'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['prefix_phone']));

  $formData['phone'] = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['phone']));

  $formData['email']= filter_var($_POST['email'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['email']));

  $formData['textarea']= filter_var($_POST['textarea'], FILTER_SANITIZE_STRING);
  $formData[] = trim(substr_replace($bad_chars,"",$forData['textarea']));

  return $formData;
}



function IsEmptyFields(){
  $formReport = array();
  $err = False;

  foreach ($_POST as $key => $value) {
    if(has_presence($value)||($key == middlename)||($key == address2)||($key == textarea)){
      $formReport[$key] = $value;

    }
    else {
      $formReport[$key] = "Error: Empty ".$key;
      $err = True;

    }

  }

  if(!array_key_exists('gender',$_POST)) {
    $formReport['gender']="Error: Empty ".'gender';
    $err = True;
  }
  if(!array_key_exists('category',$_POST)) {
    $formReport['category']="Error: Empty ".'category';
    $err = True;
  }
  if(!array_key_exists('elevel',$_POST)) {
    $formReport['elevel']="Error: Empty ".'elevel';
    $err = True;
  }
  if ($err){
    // echo " create Error Form : ";
    // echo "<br  />";
    write_form($formReport);
    return False;
  }
  else {
    return true;
  }

}
function validate_dob($formData){
  // echo " Inside of  validate_dob function ";
  // echo "<br  />";
  $formReport = $formData;

  $err = false;
  // Validate Birth date
  $d1 = date_create("NOW");
  $dob = date('Y-m-j',strtotime($formData['year']."-".$formData['month']."-".$formData['day']));
  // echo " ---> $dob";
  $d2 = date_create($dob);
  $diff = date_diff($d1,$d2);
  if($diff->y < 18){
    $formReport['dob_age']="Error: Invalid Year: ". $diff->y;
    // echo "<br />";
    // echo "Invalid Year: ". $diff->y . " years old, must be 18 or older!";
    // echo "<br />";
    $err = True;
  }

  // echo "<br />";
  // echo " d2 = ". $dob;
  echo "<br />";
  echo "----> ".$formData['year']."-".$formData['month']."-".$formData['day'];
  // $dtt= $formData['day']." ".$formData['month']." ".$formData['year'];
  echo "<br />";
  // echo $dtt;
  // echo "<br />";
  // $t = strtotime($formData['day'].' '.$formData['month'].' '.$formData['year']);
  // // $t = strtotime($dtt);
  // var_dump($t);
  // echo "<br />";
  // echo " ****** t = ".$t;
  // echo "<br />";
  // echo " t = ".date("F-d-Y",$t);
  // echo "<br />";
  $dt = date('F-m-Y',strtotime($formData['year']."-".$formData['month']."-".$formData['day']));
  if(dt != $formData['month']."-".$formData['day']."-".$formData['year']){
    // echo "<br />";
    // echo " ---> Invalid Birth Date Entry";
    // echo "<br />";
    // echo " ---> $dt ";
    // echo "<br />";
    $formReport['dob_invalid'] = " Invalid Birth Date Entry: ";
    $err = True;
  }
  if ($err){
    write_form($formReport);
    return false;
  }
  return ture;
}

function validate_zip($formData){

  // echo "<br />";
  // echo " ===> Inside validate_zip Function!!! ";
  // echo "<br />";
  $formReport = $formData;
  // Validate zip
  if(!is_numeric($formData['zip']) || strlen($formData['zip'])!=5){
    $formReport['err_zip'] = "Error: Invalid zip code";
    write_form($formReport);
    // echo "<br />";
    // echo " --> ERROR: zip is Not Valid = ".$formData['zip'];
    // echo "<br />";
    return false;
  }
    return true;
}
function validate_phone($formData){
  // echo "<br />";
  // echo " ===> Inside validate_phone Function!!! ";
  // echo "<br />";
  $formReport = $formData;
  $err = false;

  // Validate Phone number
  if(!is_numeric($formData['area_phone']) || strlen($formData['area_phone'])!=3){
    $formReport['err_area_ph'] = "Error: Invalid Area code";
    $err = true;
    // echo "<br />";
    // echo " --> ERROR: Area is Not Valid = ".$formData['area_phone'];
    // echo "<br />";
  }
  if(!is_numeric($formData['prefix_phone']) || strlen($formData['prefix_phone'])!=3){
    $formReport['err_prefix_ph'] = "Error: Invalid Prefix Phone";
    $err = true;
    // echo "<br />";
    // echo " --> ERROR: Area is Not Valid = ".$formData['prefix_phone'];
    // echo "<br />";
  }
  if(!is_numeric($formData['phone']) || strlen($formData['phone'])!=4){
    $formReport['err_phone'] = "Error: Invalid Phone";
    $err = true;
    // echo "<br />";
    // echo " --> ERROR: Area is Not Valid = ".$formData['phone'];
    // echo "<br />";
  }
  if ($err){
    write_form($formReport);
    return false;
  }
  return true;
}

function writefooter(){
  print <<<ENDBLOCK
    </body>
    </html>
ENDBLOCK;
}

function writeheader(){
  print <<<ENDBLOCK
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset=utf-8>
    <title>SDSU Annual Marathon</title>

      <link rel="stylesheet" type="text/css" href="css/proj2.css" />

      <script type="text/javascript" src="http://jadran.sdsu.edu/jquery/jquery.js"></script>
      <!-- <script type="text/javascript" src="proj2.js"></script> -->
      <script type="text/javascript" src="proj2Submit.js"></script>



      <!--<script src="myjsfile.js"></script>-->
  </head>


  <body>
  <!--<div class="container">-->


  <header>
    <div class="banner">
      <!--<img src="img/sdsu_1.png" width="50px" height="50px" />-->
        <h1>San Diego State University Marathon 2016</h1>

    </div>
  </header>

  <div class="left_column">
    <ul>
      <li><a href="index.html" title="home">Home</a></li>
      <li><a href="register.html" title="Registration">Registration</a></li>
    </ul>
  </div>
ENDBLOCK;
}

function write_form($report){
  // echo " ---> Inside of write_form  function  " ;
  // echo "<br />";

  // if(!array_key_exists('gender',$report)) {
  //   echo " ERROR:  gender field does not exist!!!! " ;
  // }

  $err_color = 'style="color: red;"';
  foreach ($report as $key => $value) {
    if($value === "Error: Empty ".$key){
      if($key=='category') {$err_c = $err_color; $err_msg="ERROR: Category is a Required field!";}
      if($key=='elevel') {$err_elvl = $err_color; $err_msg="ERROR: Experience level is a Required field!";}

      if($key=='lname') {$err_name = $err_color;$err_lname =$err_name; $err_msg="ERROR: Last name is a Required field!";}
      if($key=='fname') {$err_name = $err_color;$err_fname =$err_name; $err_msg="ERROR: First name is a Required field!";}

      if($key=='year') {$err_dt = $err_color;$err_yr =$err_dt; $err_msg="ERROR: Year is a Required field!";}
      if($key=='month') {$err_dt = $err_color;$err_month =$err_dt; $err_msg="ERROR: Month is a Required field!";}
      if($key=='day') {$err_dt = $err_color;$err_day =$err_dt; $err_msg="ERROR: Day is a Required field!";}

      if($key=='gender') {$err_g = 'style="color: red;"'; $err_msg="ERROR: Gender is a Required field!";}

      if($key=='address') {$err_addr = $err_color;$err_saddr =$err_addr; $err_msg="ERROR: Address is a Required field!";}
      if($key=='city') {$err_addr = $err_color;$err_city =$err_addr; $err_msg="ERROR: City is a Required field!";}
      if($key=='zip') {$err_addr = $err_color;$err_zip =$err_addr; $err_msg="ERROR: Zip is a Required field!";}
      if($key=='state') {$err_addr = $err_color;$err_state =$err_addr; $err_msg="ERROR: State is a Required field!";}

      if($key=='area_phone') {$err_ph = $err_color;$err_area =$err_ph; $err_msg="ERROR: Phone Area Code is a Required field!";}
      if($key=='prefix_phone') {$err_ph = $err_color; $err_phnum=$err_ph; $err_msg="ERROR: Phone Prefix is a Required field!";}
      if($key=='phone') {$err_ph = $err_color; $err_phnum=$err_ph; $err_msg="ERROR: Phone is a Required field!";}

      if($key=='email') {$err_email = $err_color; $err_msg="ERROR: Email is a Required field!";}

      $report[$key] = "";

    }
    if(($key==='dob_age')&&($value != "")){
      $err_dt = $err_color;
      $err_msg=$value;
      $report[$key] = "";
    }
    if(($key==='dob_invalid')&&($value != "")){
      $err_dt = $err_color;
      $err_msg=$value;
      $report[$key] = "";
    }
    if(($key=='err_zip')&&($value === "Error: Invalid zip code")){
      $err_addr = $err_color;
      $err_zip =$err_addr;
      $err_msg=$value;
      // $report[$key] = "";
    }
    if((($key=='err_area_ph')||($key=='err_prefix_ph')||($key=='err_phone'))&&
      (($value=="Error: Invalid Area code")||($value=="Error: Invalid Prefix Phone")||
      ($value=="Error: Invalid Phone"))){
      $err_ph = $err_color;
      $err_area = $err_color;
      $err_phnum = $err_color;
      $err_msg=$value;
      // $report[$key] = "";
    }
  }


  if(isset($report['fname'])) {$fname = $report['fname'];}
  if(isset($report['mname'])) {$mname = $report['mname'];}
  if(isset($report['lname'])) {$lname = $report['lname'];}
  if(isset($report['category'])) {$category = $report['category'];}
  if(isset($report['elevel'])) {$exp = $report['elevel'];}
  if(isset($report['gender'])) {$gender = $report['gender'];}
  if(isset($report['month'])) {$month = $report['month'];}
  if(isset($report['day'])) {$day = $report['day'];}
  if(isset($report['year'])) {$year = $report['year'];}
  if(isset($report['state'])) {$state = $report['state'];}
  if(isset($report['address'])) {$address = $report['address'];}
  if(isset($report['address2'])) {$address2 = $report['address2'];}
  if(isset($report['city'])) {$city = $report['city'];}
  if(isset($report['zip'])) {$zip = $report['zip'];}
  if(isset($report['area_phone'])) {$area_code = $report['area_phone'];}
  if(isset($report['prefix_phone'])) {$prefix_phone = $report['prefix_phone'];}
  if(isset($report['phone'])) {$phone = $report['phone'];}
  if(isset($report['email'])) {$email = $report['email'];}
  if(isset($report['textarea'])) {$textarea = $report['textarea'];}


  // var_dump($report);
  // echo "<br />";


  writeheader();


    print <<<ENDBLOCK

  <div class="main_body">
      <div id="main-body-form-header">
      <span class="main-body-form-header-text" style="color: red; padding-left: 50px; font-size: x-large">SDSU Marathon Form</span><br/>
      <span class="main-body-form-header-text" style="padding-left: 50px;">Sunday December 4, 2016</span><br/>
      <span class="main-body-form-header-text" style="padding-left: 50px;">San Diego, CA</span>
      </div>

      <div id="msg_line">
          <span style="padding-left: 10px"> Participant Information</span><br/>
          <span style="padding-left: 10px; padding-bottom: 10px"> &lpar;&ast;indicates required information&rpar;</span><br>
          <div  style="padding-top:10px;line-height: 10px;text-align: center; color: red;" id="message_line">&nbsp;$err_msg</div>
      </div>
    <form action="tempProcessing.php" method="post">
    <!-- <form> -->

      <fieldset>

          <ul class="form-style-name">
          <li>
              <label class="category" $err_c>Category&ast; &colon; </label>
ENDBLOCK;
              $category_items = array("Teen","Adult","Senior");
              foreach ($category_items as $item) {
                echo "<input type='radio' class='category' name='category' value='$item'";
                if($category == $item)
                  echo " checked = 'checked'";

                echo " />$item";
              }
              echo "<br />";

              print <<<ENDBLOCK
          </li>
          <li>
          <label class="experience" $err_elvl>Experience level&ast; &colon;</label>
ENDBLOCK;
              $exp_items = array("Expert","Experienced","Novice");
              foreach ($exp_items as $item) {
                echo "<input type='radio' class='experience' name='elevel' value='$item'";
                if($exp == $item)
                  echo " checked = 'checked'";

                echo " />$item";
              }
              echo "<br />";

              print <<<ENDBLOCK
          </li>
          <li class="form-line" id="id_4">
              <label class=form-label-top" id="label_name" $err_name>Full Name&ast;</label>
              <div>
                  <span class="form-sub-label-container" style="vertical-align: top">
                      <input class="form-textbox" type="text" size="15" name="fname" placeholder="First Name" $err_fname value="$fname" />
                      <label class="form-sub-label"  id="sublabel_name" $err_fname> First Name</label>
                  </span>

                  <span class="form-sub-label-container" style="vertical-align: top">
                      <input class="form-textbox" type="text" size="10" name="middlename" id="mname" placeholder="Middle Name" value="$mname" />
                      <label class="form-sub-label" for="mname" id="sublabel_name" > Middle Name</label>
                  </span>
                  <span class="form-sub-label-container" style="vertical-align: top">
                      <input class="form-textbox" type="text" size="15" name="lname" id="lname" placeholder="last Name" $err_lname value="$lname" />
                      <label class="form-sub-label" for="lname" id="sublabel_name"  $err_lname> Last Name</label>
                  </span>
              </div>
          </li>


          <li class="form-line-column" >

              <label class=form-label-top" id="label_dob" $err_dt>Birth Date&ast;</label>
              <div>
                  <span class="form-dob-container" style="vertical-align: top">
                      <select class="bdate" name="month">
                      <option value=""> - Month - </option>
ENDBLOCK;
                      $mon_items = array("January","Febuary","March","April","May",
                              "June","July","August","September","October",
                              "November","December");
                      foreach ($mon_items as $item) {
                        echo "<option value='$item'";
                        if($month == $item)
                          echo " selected";

                        echo ">$item</option>";
                      }
                      echo "</select>";
                      echo "<select class='id_day' name='day'>";
                      echo    "<option value=''> - Day - </option>";

                      for ($item=1;$item<=31;$item++) {
                        $i = (string)$item;
                        echo "<option value='$i'";
                        if($day == $i)
                          echo " selected";

                        echo ">$i</option>";
                      }

                      echo "</select>";
                      echo "<select class='id_yr' name='year'>";
                      echo    "<option value=''> - Year - </option>";
                      for ($item=1920;$item<=2015;$item++) {
                        $i = (string)$item;
                        echo "<option value='$i'";
                        if($year == $i)
                          echo " selected";
                        echo ">$i</option>";
                      }


      print <<<ENDBLOCK
                      </select>
                  </span>
              </div>
          </li>

          <li class="form-line-column" >
              <label class=form-label-top" id="id_gender" $err_g>Gender&ast;</label>
              <div>
                  <span class="form-gender-container" style="vertical-align: top">
ENDBLOCK;
                  $gender_items = array('male','female');
                  foreach ($gender_items as $item) {
                    $ucitem = ucfirst($item);
                    echo "<input type='radio' class='gender' name='gender' value='$item'";
                    if($gender == $item)
                      echo " checked = 'checked'";

                    echo " />$ucitem";
                  }
                  echo "<br />";

  print <<<ENDBLOCK
                  </span>
              </div>
          </li>



          <li>
              <label class=form-label-top" id="label_addr" $err_addr>Address&ast; </label>
              <div>
                  <input type="text" name="address" size="50" class="address" $err_saddr value='$address'/>
                  <label class="form-sub-label"  id="sublabel_addr" $err_saddr>Street Address</label>
                  <input type="text" name="address2" size="50" class="address" value='$address2'/>
                  <label class="form-sub-label"  id="sublabel_addr" >Street Address Line 2</label>
              </div>

              <div>
              <span class="form-sub-label-container" style="vertical-align: top">
                  <input type="text" name="city" size="20" class="city" $err_city value='$city'/>
                  <label class="form-sub-label"  id="sublabel_city" $err_city>City </label>
              </span>
              <span class="form-sub-label-container" style="vertical-align: top">
                  <select class="state" name="state">
                  <option value="">- Select State -</option>
ENDBLOCK;

                $state_items = array("AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL",
                              "GA","HI","ID","IL","IN","IA","KS","KY","LA","ME",
                              "MD","MA","MI","MN","MS","MO","MT","NE","NV","NH",
                              "NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI",
                              "SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY");
                foreach ($state_items as $item) {
                  echo "<option value='$item'";
                  if($state == $item)
                    echo " selected";

                  echo ">$item</option>";
                }


              print <<<ENDBLOCK
              </select>
                  <label class="form-sub-label"  id="sublabel_state" $err_state">State/Province </label>
              </span>

              <span class="form-sub-label-container" style="vertical-align: top">
                  <input type="text" name="zip" size="10" class="zip" $err_zip value='$zip'/>
                  <label class="form-sub-label"  id="sublabel_zip" $err_zip>Postal/Zip Code </label>
              </span>
              </div>

          </li>


          <li class="form-line">
              <label class=form-label-top" id="label_ph" $err_ph>Primary Phone Number&ast;</label>
              <div>
                  <span class="form-sub-label-container" style="vertical-align: top">
                      &lpar;<input type="text" name="area_phone" class="area_phone" size="3" maxlength="3" value='$area_code'/>&rpar;&nbsp;-&nbsp;
                      <label class="form-sub-label"  id="sublabel_acode" $err_area>Area Code</label>
                  </span>

                  <span class="form-sub-label-container" style="vertical-align: top">
                      <input type="text" class="prefix_phone" name="prefix_phone" size="3" maxlength="3" value='$prefix_phone'/>&nbsp;-&nbsp;
                      <input type="text" class="phone" name="phone" size="4" maxlength="4" value='$phone'/>
                      <label class="form-sub-label"  id="sublabel_ph" $err_phnum>Phone Number</label>
                  </span>
              </div>
          </li>
          <li>
              <label id="label_email" $err_email>EMail&ast; &colon;</label><br/>
              <input type="text" name="email" class="email" size="15" value='$email'/>
          </li>
          <li>
            <label class="form-label-top" id="label_imgupload" > Photograph: </label>
            <div class="form-input-wide">
              Upload Your Photograph: <input type="file" name="photograph" id="photograph" />
            </div>
          </li>
          <li>
              <label class="form-label form-label-top form-label-auto" id="label_textarea" > Medical Conditions </label>
              <div class="form-input-wide">
                  <textarea class=textarea" class="form-textarea" name="textarea" cols="40" rows="6" value='$textarea'></textarea>
              </div>
          </li>
          </ul>

              <div class="buttons">
                  <input type="reset" />
                  <input type="submit" value="Submit" />
              </div>
      </fieldset>
  </form>
  </div>



ENDBLOCK;

writefooter();
}
 ?>
