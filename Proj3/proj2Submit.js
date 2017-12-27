/**
 * Created by am on 10/8/16.
 * Copied from Prof. Alan Riggins's form.js
 *
 */

    function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;
    }
    function getMonthFromString(mon){

        var month = [];
        month["January"] = 0;
        month["Febuary"] = 1;
        month["March"]   = 2;
        month["April"]   = 3;
        month["May"]     = 4;
        month["June"]    = 5;
        month["July"]    = 6;
        month["August"]  = 7;
        month["September"] = 8;
        month["October"]   = 9;
        month["November"]  = 10;
        month["December"]  = 11;

        // alert("mon = "+ mon);
       var m = month[mon];

        // alert("d = "+m);

       if(!isNaN(m)){
          return m;
       }
       return -1;
     }
    function validateDoB(yr,mon,day) {
        // alert("yr = "+ yr + " mm = "+ mon + " dd = "+ day);

        var usrDoB = new Date(yr,mon,day);
        //

        // alert("usrDOB = "+ usrDoB.getFullYear() + usrDoB.getMonth() + usrDoB.getDate());


        if(usrDoB.getFullYear() != yr){
            return true;
        }
        if(usrDoB.getMonth() != mon){
            return true;
        }
        if(usrDoB.getDate() != day){
            return true;
        }
        return false;
    }

    function validateAge(birthday) {
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    function isValidState(state) {
        var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC",
        "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA",
        "MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
        "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
        "UT","VA","VT","WA","WI","WV","WY");
        for(var i=0; i < stateList.length; i++)
            if(stateList[i] == $.trim(state))
                return true;
        return false;
        }

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }

$(document).ready( function() {
    var errorStatusHandle = $('#message_line');
    var elementHandle = new Array(16);
    elementHandle[0] = $('[name="category"]');
    elementHandle[1] = $('[name="elevel"]');
    elementHandle[2] = $('[name="fname"]');
    elementHandle[3] = $('[name="lname"]');
    elementHandle[4] = $('[name="month"]');
    elementHandle[5] = $('[name="day"]');
    elementHandle[6] = $('[name="year"]');
    elementHandle[7] = $('[name="gender"]');
    elementHandle[8] = $('[name="address"]');
    elementHandle[9] = $('[name="city"]');
    elementHandle[10] = $('[name="state"]');
    elementHandle[11] = $('[name="zip"]');
    elementHandle[12] = $('[name="area_phone"]');
    elementHandle[13] = $('[name="prefix_phone"]');
    elementHandle[14] = $('[name="phone"]');
    elementHandle[15] = $('[name="email"]');
//
//     function isValidData(){
//         if ($('input[name=category]:checked').length<=0) {
//             $('.category').css('color','red');
//             errorStatusHandle.text("Please select Category ");
//             elementHandle[0].focus();
//             return false;
//         }
//         if ($('input[name=elevel]:checked').length<=0) {
//             $('.experience').css('color','red');
//             errorStatusHandle.text("Please select Experience level");
//             elementHandle[1].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[2].val())) {
//             elementHandle[2].addClass("error");
//             $('#sublabel_fname').css('color','red');
//             $('#label_name').css('color','red');
//             errorStatusHandle.text("Please enter your first name");
//             elementHandle[2].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[3].val())) {
//             elementHandle[3].addClass("error");
//             $('#sublabel_lname').css('color','red');
//             $('#label_name').css('color','red');
//             errorStatusHandle.text("Please enter your last name");
//             elementHandle[3].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[4].val())) {
//             elementHandle[4].addClass("error");
//             errorStatusHandle.text("Please enter your birthdate Month");
//             $('#label_dob').css('color','red');
//             elementHandle[4].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[5].val())) {
//             elementHandle[5].addClass("error");
//             errorStatusHandle.text("Please enter your birthdate Day");
//             $('#label_dob').css('color','red');
//             elementHandle[5].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[6].val())) {
//             elementHandle[6].addClass("error");
//             errorStatusHandle.text("Please enter your birthdate Year");
//             $('#label_dob').css('color','red');
//             elementHandle[6].focus();
//             return false;
//         }
//         var month = getMonthFromString(elementHandle[4].val());
//         var day = elementHandle[5].val();
//         var year = elementHandle[6].val();
//
//
//
//         if(validateDoB(year,month,day)) {
//             $("#label_dob").css('color','red');
//             errorStatusHandle.text("Please enter valid Birth Date");
//             elementHandle[4].addClass("error");
//             elementHandle[4].focus();
//             elementHandle[5].addClass("error");
//             elementHandle[5].focus();
//             elementHandle[6].addClass("error");
//             elementHandle[6].focus();
//             return false;
//         }
//         var d = new Date(year,month,day);
//         if(validateAge(d) < 16) {
//             $('#label_dob').css('color','red');
//             errorStatusHandle.text("You must be at least 16 years old to Register!!!");
//             elementHandle[4].addClass("error");
//             elementHandle[5].addClass("error");
//             elementHandle[6].addClass("error");
//             elementHandle[4].focus();
//             elementHandle[5].focus();
//             elementHandle[6].focus();
//             return false;
//         }
//
//         if ($('input[name=gender]:checked').length<=0) {
//                 $('#id_gender').css('color','red');
//                 errorStatusHandle.text("Please select Gender");
//                 elementHandle[7].focus();
//                 return false;
//         }
//
//
//         if(isEmpty(elementHandle[8].val())) {
//             elementHandle[8].addClass("error");
//             errorStatusHandle.text("Please enter your address");
//             elementHandle[8].focus();
//             $('#label_addr').css('color','red');
//             $('#sublabel_addr').css('color','red');
//
//             return false;
//         }
//         if(isEmpty(elementHandle[9].val())) {
//             elementHandle[9].addClass("error");
//             errorStatusHandle.text("Please enter your city");
//             elementHandle[9].focus();
//             $('#label_addr').css('color','red');
//             $('#sublabel_city').css('color','red');
//             return false;
//         }
//
//         if(!isValidState(elementHandle[10].val())) {
//             elementHandle[10].addClass("error");
//             errorStatusHandle.text("Please select valid state ");
//             elementHandle[10].focus();
//             $('#label_addr').css('color','red');
//             $('#sublabel_state').css('color','red');
//             return false;
//         }
//         if(isEmpty(elementHandle[11].val())) {
//             elementHandle[11].addClass("error");
//             errorStatusHandle.text("Please enter your zip code");
//             elementHandle[11].focus();
//             $('#label_addr').css('color','red');
//             $('#sublabel_zip').css('color','red');
//             return false;
//         }
//         if(!$.isNumeric(elementHandle[11].val())) {
//             elementHandle[11].addClass("error");
//             errorStatusHandle.text("The zip code appears to be invalid, "+
//             "numbers only please. ");
//             $('#label_addr').css('color','red');
//             $('#sublabel_zip').css('color','red');
//             elementHandle[11].focus();
//             return false;
//         }
//         if(elementHandle[11].val().length != 5) {
//             elementHandle[11].addClass("error");
//             errorStatusHandle.text("The zip code must have exactly five digits")
//             $('#label_addr').css('color','red');
//             $('#sublabel_zip').css('color','red');
//             elementHandle[11].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[12].val())) {
//             elementHandle[12].addClass("error");
//             errorStatusHandle.text("Please enter your area code");
//             $('#label_ph').css('color','red');
//             $('#sublabel_acode').css('color','red');
//             elementHandle[12].focus();
//             return false;
//         }
//         if(!$.isNumeric(elementHandle[12].val())) {
//             elementHandle[12].addClass("error");
//             errorStatusHandle.text("The area code appears to be invalid, "+
//             "numbers only please. ");
//             $('#label_ph').css('color','red');
//             $('#sublabel_acode').css('color','red');
//             elementHandle[12].focus();
//             return false;
//         }
//         if(elementHandle[12].val().length != 3) {
//             elementHandle[12].addClass("error");
//             errorStatusHandle.text("The area code must have exactly three digits")
//             $('#label_ph').css('color','red');
//             $('#sublabel_acode').css('color','red');
//             elementHandle[12].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[13].val())) {
//             elementHandle[13].addClass("error");
//             errorStatusHandle.text("Please enter your phone number prefix");
//             $('#label_ph').css('color','red');
//             $('#sublabel_ph').css('color','red');
//             elementHandle[13].focus();
//             return false;
//         }
//         if(!$.isNumeric(elementHandle[13].val())) {
//             elementHandle[13].addClass("error");
//             errorStatusHandle.text("The phone number prefix appears to be invalid, "+
//             "numbers only please. ");
//             $('#label_ph').css('color','red');
//             $('#sublabel_ph').css('color','red');
//             elementHandle[13].focus();
//             return false;
//         }
//         if(elementHandle[13].val().length != 3) {
//             elementHandle[13].addClass("error");
//             errorStatusHandle.text("The phone number prefix must have exactly three digits")
//             $('#label_ph').css('color','red');
//             $('#sublabel_ph').css('color','red');
//             elementHandle[13].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[14].val())) {
//             elementHandle[14].addClass("error");
//             errorStatusHandle.text("Please enter your phone number");
//             $('#label_ph').css('color','red');
//             $('#sublabel_ph').css('color','red');
//             elementHandle[14].focus();
//             return false;
//         }
//         if(!$.isNumeric(elementHandle[14].val())) {
//             elementHandle[14].addClass("error");
//             errorStatusHandle.text("The phone number appears to be invalid, "+
//             "numbers only please. ");
//             $('#label_ph').css('color','red');
//             $('#sublabel_ph').css('color','red');
//             elementHandle[14].focus();
//             return false;
//         }
//         if(elementHandle[14].val().length != 4) {
//             elementHandle[14].addClass("error");
//             errorStatusHandle.text("The phone number must have exactly four digits")
//             $('#label_ph').css('color','red');
//             $('#sublabel_ph').css('color','red');
//             elementHandle[14].focus();
//             return false;
//         }
//         if(isEmpty(elementHandle[15].val())) {
//             elementHandle[15].addClass("error");
//             errorStatusHandle.text("Please enter your email address");
//             $('#label_email').css('color','red');
//             elementHandle[15].focus();
//             return false;
//         }
//         if(!isValidEmail(elementHandle[15].val())) {
//             elementHandle[15].addClass("error");
//             errorStatusHandle.text("The email address appears to be invalid,");
//             $('#label_email').css('color','red');
//             elementHandle[15].focus();
//             return false;
//         }
//         return true;
//
//     }
//     /////// HANDLERS
//
// // on blur, if the user has entered valid data, the error message
// // should no longer show.
//     elementHandle[0].click(function () {
//         if($(this).length > 0){
//             $('.category').css('color','black');
//             errorStatusHandle.text("");
//
//         }
//     });
//     elementHandle[1].click(function () {
//         if($(this).length > 0){
//             $('.experience').css('color','black');
//             errorStatusHandle.text("");
//
//         }
//     });
//     elementHandle[7].click(function () {
//         if($(this).length > 0){
//             $('#id_gender').css('color','black');
//             errorStatusHandle.text("");
//
//         }
//     });
//
//     elementHandle[2].on('keyup keypress blur change', function() {
//         if (isEmpty(elementHandle[2].val())){
//             return;
//         }else{
//             $(this).removeClass("error");
//             $('#sublabel_fname').css('color','black');
//             $('#label_name').css('color','black');
//             errorStatusHandle.text("");
//             }
//     });
//     elementHandle[3].on('keyup keypress blur change', function() {
//         if (isEmpty(elementHandle[3].val())){
//             return;
//         }else{
//             $(this).removeClass("error");
//             $('#sublabel_lname').css('color','black');
//             $('#label_name').css('color','black');
//             errorStatusHandle.text("");
//             }
//     });
//     elementHandle[4].change(function() {
//         if (isEmpty(elementHandle[4].val())){
//             return;
//         }else{
//             $(this).removeClass("error");
//             elementHandle[5].removeClass("error");
//             elementHandle[6] .removeClass("error");
//             $('#label_dob').css('color','black');
//             errorStatusHandle.text("");
//             }
//     });
//     elementHandle[5].change(function() {
//         if (isEmpty(elementHandle[5].val())){
//             return;
//         }else{
//             $(this).removeClass("error");
//             elementHandle[4].removeClass("error");
//             elementHandle[6] .removeClass("error");
//             $('#label_dob').css('color','black');
//             errorStatusHandle.text("");
//             }
//     });
//     elementHandle[6].change(function() {
//         if (isEmpty(elementHandle[6].val())){
//             return;
//         }else{
//             $(this).removeClass("error");
//             elementHandle[5].removeClass("error");
//             elementHandle[4] .removeClass("error");
//             $('#label_dob').css('color','black');
//             errorStatusHandle.text("");
//             }
//     });
//     elementHandle[8].on('blur', function() {
//         if(isEmpty(elementHandle[9].val())) {
//             return;
//         }
//         else {
//             $(this).removeClass("error");
//             errorStatusHandle.text("");
//             $('#label_addr').css('color','black');
//             $('#sublabel_addr').css('color','black');
//         }
//     });
//     elementHandle[9].on('blur', function() {
//         if(isEmpty(elementHandle[9].val()))
//             return;
//         if(!isValidState(elementHandle[10].val())) {
//             $(this).removeClass("error");
//             errorStatusHandle.text("");
//             $('#label_addr').css('color','black');
//             $('#sublabel_city').css('color','black');
//         }
//     });
//     elementHandle[10].change(function() {
//         if(isEmpty(elementHandle[10].val()))
//             return;
//         if(isValidState(elementHandle[10].val())) {
//             $(this).removeClass("error");
//             errorStatusHandle.text("");
//             $('#label_addr').css('color','black');
//             $('#sublabel_state').css('color','black');
//         }
//     });
//     elementHandle[11].on('keyup keypress blur change', function() {
//         if(isEmpty(elementHandle[11].val()))
//             return;
//         if(($.isNumeric(elementHandle[11].val())) && (elementHandle[11].val().length == 5)) {
//             $(this).removeClass("error");
//             errorStatusHandle.text("");
//             $('#label_addr').css('color','black');
//             $('#sublabel_zip').css('color','black');
//         }
//     });
//     elementHandle[12].on('keyup keypress blur change', function() {
//         if(isEmpty(elementHandle[12].val()))
//             return;
//         if(($.isNumeric(elementHandle[12].val())) && (elementHandle[12].val().length == 3)) {
//             $(this).removeClass("error");
//             errorStatusHandle.text("");
//             $('#label_ph').css('color','black');
//             $('#sublabel_acode').css('color','black');
//         }
//     });
//     elementHandle[13].on('keyup keypress blur change', function() {
//         if(isEmpty(elementHandle[13].val()))
//             return;
//         if(($.isNumeric(elementHandle[13].val())) && (elementHandle[13].val().length == 3)) {
//             $(this).removeClass("error");
//             errorStatusHandle.text("");
//             $('#label_ph').css('color','black');
//             $('#sublabel_ph').css('color','black');
//         }
//     });
//     elementHandle[14].on('keyup keypress blur change', function() {
//         if(isEmpty(elementHandle[14].val()))
//             return;
//         if(($.isNumeric(elementHandle[14].val())) && (elementHandle[14].val().length == 4)) {
//             $(this).removeClass("error");
//             errorStatusHandle.text("");
//             $('#label_ph').css('color','black');
//             $('#sublabel_ph').css('color','black');
//         }
//     });
//     elementHandle[15].on('keyup keypress blur change', function() {
//         if(isEmpty(elementHandle[14].val()))
//             return;
//         if(isValidEmail(elementHandle[15].val())) {
//             $(this).removeClass("error");
//             errorStatusHandle.text("");
//             $('#label_email').css('color','black');
//         }
//     });

    /////////////////////////////////////////////////////////////////

    // elementHandle[4].on('keyup', function() {
    //     elementHandle[4].val(elementHandle[4].val().toUpperCase());
    // });

    // elementHandle[12].on('keyup', function() {
    //     if(elementHandle[12].val().length == 3)
    //         elementHandle[13].focus();
    // });
    //
    // elementHandle[13].on('keyup', function() {
    //     if(elementHandle[13].val().length == 3)
    //         elementHandle[14].focus();
    // });
    // elementHandle[14].on('keyup', function() {
    //     if(elementHandle[14].val().length == 4)
    //         elementHandle[15].focus();
    // });



    $(':submit').on('click', function(e) {

      e.preventDefault();
      var params = "email="+elementHandle[15].val();
      var url = "check_duplicate.php?"+params;
      // alert(url);
      // $.get(url, dup_handler);
      $.get(url, processUpload);



    });

    $(':reset').on('click', function() {
        for(var i=0; i < 16; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
    });
});

function processUpload(response) {
    // alert(response);
    // $('#message_line').text("inside of dup_handler");
    if(response == "dup")
        $('#message_line').text('ERROR, Duplicate user ');
    else if(response == "OK") {
      send_file();    // picture upload takes longer, get it going

      $('form').serialize();
      $('form').submit();
        }
    else
        alert(response);

    // send_form_data();
}
function dup_handler(response) {
  alert(response);
  // $('#message_line').text("inside of dup_handler");
  if(response == "dup")
      $('#message_line').text('ERROR, Duplicate user ');
  else if(response == "OK") {
    $('form').serialize();
      // postData = $('form').serialize();
      // $.post('process.php',postData+'&action=submit&ajaxrequest=1', function(msg) {
      //   if (msg){
      //     $('form').before(msg);
      //   }
      //   /*optional stuff to do after success */
      // });
      // return false;
    $('form').submit();
      }
  else
      alert(response);
}



function send_form_data() {
    var loc = $('input:text[name=location]').val();
    var dt = $('input:text[name=date]').val();
    var taker = $('input:text[name=photographer]').val();
    var postData = $('form').serialize();
    var url = "process.php";
    url += postData + "&photographer="+taker;
    var req = new HttpRequest(url, handleData);
    req.send();
}

function handleData(response) {
     $('#message_line').css('color','blue');
     $('#message_line').html(response);
}

function send_file() {
    var form_data = new FormData($('form')[0]);
    form_data.append("image", document.getElementById("photograph").files[0]);
    $.ajax( {
        url: "ajax_file_upload.php",
        // url: "confirm_Img.php",
        contentType: false,
        type: "post",
        data: form_data,
        processData: false,
        // type: "POST",             // Type of request to be send, called as method
        // data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        // contentType: false,       // The content type used when sending data to the server.
        // cache: false,             // To unable request pages to be cached
        // processData:false,        // To send DOMDocument or non processed data file it is set to false

        success: function(response) {
           $('#message_line').css('color','blue');
           $('#message_line').html("Your file has been received.");
           var fname = $("#photograph").val();
           var toDisplay = "<img src=\"/home/am/Sites/Proj3/_uploadDIR_/" + fname + "\" />";
           $('#pic').html(toDisplay);
            },
        error: function(response) {
           $('#message_line').css('color','red');
           $('#message_line').html("Sorry, an upload error occurred, "+response.statusText);
            }
    });
}
