/**
 * Created by am on 12/12/16.
 */

    function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;
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


$(document).ready( function() {
    var errorStatusHandle = $('#message_line');
    var elementHandle = new Array(10);



    elementHandle[0] = $('[name="billing-fname"]');
    elementHandle[1] = $('[name="billing-lname"]');
    elementHandle[2] = $('[name="billing-address1"]');
    elementHandle[3] = $('[name="billing-city"]');
    elementHandle[4] = $('[name="billing-state"]');
    elementHandle[5] = $('[name="billing-zip"]');
    elementHandle[6] = $('[name="billing-area_phone"]');
    elementHandle[7] = $('[name="billing-prefix_phone"]');
    elementHandle[8] = $('[name="billing-phone"]');

    elementHandle[9] = $('[name="shipping-fname"]');
    elementHandle[10] = $('[name="shipping-lname"]');
    elementHandle[11] = $('[name="shipping-address1"]');
    elementHandle[12] = $('[name="shipping-city"]');
    elementHandle[13] = $('[name="shipping-state"]');
    elementHandle[14] = $('[name="shipping-zip"]');
    elementHandle[15] = $('[name="shipping-area_phone"]');
    elementHandle[16] = $('[name="shipping-prefix_phone"]');
    elementHandle[17] = $('[name="shipping-phone"]');
    elementHandle[18] = $('[name="ccard-num"]');


    $('#sameAsBilling').click(function () {
       if($(this).is(":checked")){
        // alert( $('[name="billing-fname"]').val());
           $('[name="shipping-fname"]').val($('[name="billing-fname"]').val());
           $('[name="shipping-lname"]').val($('[name="billing-lname"]').val());
           $('[name="shipping-address1"]').val($('[name="billing-address1"]').val());
           $('[name="shipping-city"]').val($('[name="billing-city"]').val());
           $('[name="shipping-state"]').val($('[name="billing-state"]').val());
           $('[name="shipping-zip"]').val($('[name="billing-zip"]').val());
           $('[name="shipping-area_phone"]').val($('[name="billing-area_phone"]').val());
           $('[name="shipping-prefix_phone"]').val($('[name="billing-prefix_phone"]').val());
           $('[name="shipping-phone"]').val($('[name="billing-phone"]').val());

           for (var i=0; i<9;i++){
            $(elementHandle[9+i]).removeClass("error");
            errorStatusHandle.text("");
            elementHandle[i+9].css('color','black');
           }
       }
    });

    // elementHandle[10] = $('[name="month"]');
    // elementHandle[11] = $('[name="day"]');
    // elementHandle[12] = $('[name="year"]');

    function isValidData(){
        if(isEmpty(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            $('#billing-fname').css('color','red');
            errorStatusHandle.text("Please enter your first name");
            elementHandle[0].focus();
            return false;
        }
        if(isEmpty(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            $('#billing-lname').css('color','red');
            errorStatusHandle.text("Please enter your last name");
            elementHandle[1].focus();
            return false;
        }

        if(isEmpty(elementHandle[2].val())) {
            elementHandle[2].addClass("error");
            $('#billing-address1').css('color','red');
            errorStatusHandle.text("Please enter your address");
            elementHandle[2].focus();


            return false;
        }
        if(isEmpty(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter your city");
            elementHandle[3].focus();
            $('#billing-city').css('color','red');
            return false;
        }

        if(!isValidState(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please select valid state ");
            elementHandle[4].focus();
            $('#billing-state').css('color','red');
            return false;
        }
        if(isEmpty(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            $('#billing-zip').css('color','red');
            errorStatusHandle.text("Please enter your zip code");
            elementHandle[5].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            $('#billing-zip').css('color','red');
            errorStatusHandle.text("The zip code appears to be invalid, "+
            "numbers only please. ");
            elementHandle[5].focus();
            return false;
        }
        if(elementHandle[5].val().length != 5) {
            elementHandle[5].addClass("error");
            $('#billing-zip').css('color','red');
            errorStatusHandle.text("The zip code must have exactly five digits")
            elementHandle[5].focus();
            return false;
        }
        if(isEmpty(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            $('#billing-acode').css('color','red');
            errorStatusHandle.text("Please enter your area code");
            elementHandle[6].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("The area code appears to be invalid, "+
            "numbers only please. ");
            $('#billing-acode').css('color','red');
            elementHandle[6].focus();
            return false;
        }
        if(elementHandle[6].val().length != 3) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("The area code must have exactly three digits")
            $('#billing-acode').css('color','red');
            elementHandle[6].focus();
            return false;
        }
        if(isEmpty(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Please enter your phone number prefix");
            $('#billing-preph').css('color','red');
            elementHandle[7].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("The phone number prefix appears to be invalid, "+
            "numbers only please. ");
            $('#billing-preph').css('color','red');
            elementHandle[7].focus();
            return false;
        }
        if(elementHandle[7].val().length != 3) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("The phone number prefix must have exactly three digits")
            $('#billing-preph').css('color','red');
            elementHandle[7].focus();
            return false;
        }
        if(isEmpty(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter your phone number");
            $('#billing-ph').css('color','red');
            elementHandle[8].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("The phone number appears to be invalid, "+
            "numbers only please. ");
            $('#billing-ph').css('color','red');
            elementHandle[8].focus();
            return false;
        }
        if(elementHandle[8].val().length != 4) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("The phone number must have exactly four digits")
            $('#billing-ph').css('color','red');
            elementHandle[8].focus();
            return false;
        }
        ///////////////////////////////////////////////////////
        //////////////// Shipping //////////////////////////
        //////////////////////////////////////////////////////
        if(isEmpty(elementHandle[9].val())) {
            elementHandle[9].addClass("error");
            $('#shipping-fname').css('color','red');
            errorStatusHandle.text("Please enter your first name");
            elementHandle[9].focus();
            return false;
        }
        if(isEmpty(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            $('#shipping-lname').css('color','red');
            errorStatusHandle.text("Please enter your last name");
            elementHandle[10].focus();
            return false;
        }

        if(isEmpty(elementHandle[11].val())) {
            elementHandle[11].addClass("error");
            $('#shipping-address1').css('color','red');
            errorStatusHandle.text("Please enter your address");
            elementHandle[11].focus();


            return false;
        }
        if(isEmpty(elementHandle[12].val())) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Please enter your city");
            elementHandle[12].focus();
            $('#shipping-city').css('color','red');
            return false;
        }

        if(!isValidState(elementHandle[13].val())) {
            elementHandle[13].addClass("error");
            errorStatusHandle.text("Please select valid state ");
            elementHandle[13].focus();
            $('#shipping-state').css('color','red');
            return false;
        }
        if(isEmpty(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            $('#shipping-zip').css('color','red');
            errorStatusHandle.text("Please enter your zip code");
            elementHandle[14].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            $('#shipping-zip').css('color','red');
            errorStatusHandle.text("The zip code appears to be invalid, "+
            "numbers only please. ");
            elementHandle[14].focus();
            return false;
        }
        if(elementHandle[14].val().length != 5) {
            elementHandle[14].addClass("error");
            $('#shipping-zip').css('color','red');
            errorStatusHandle.text("The zip code must have exactly five digits")
            elementHandle[14].focus();
            return false;
        }
        if(isEmpty(elementHandle[15].val())) {
            elementHandle[15].addClass("error");
            $('#shipping-acode').css('color','red');
            errorStatusHandle.text("Please enter your area code");
            elementHandle[15].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[15].val())) {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("The area code appears to be invalid, "+
            "numbers only please. ");
            $('#shipping-acode').css('color','red');
            elementHandle[15].focus();
            return false;
        }
        if(elementHandle[15].val().length != 3) {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("The area code must have exactly three digits")
            $('#shipping-acode').css('color','red');
            elementHandle[15].focus();
            return false;
        }
        if(isEmpty(elementHandle[16].val())) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("Please enter your phone number prefix");
            $('#shipping-preph').css('color','red');
            elementHandle[16].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[16].val())) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("The phone number prefix appears to be invalid, "+
            "numbers only please. ");
            $('#shipping-preph').css('color','red');
            elementHandle[16].focus();
            return false;
        }
        if(elementHandle[16].val().length != 3) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("The phone number prefix must have exactly three digits")
            $('#shipping-preph').css('color','red');
            elementHandle[16].focus();
            return false;
        }
        if(isEmpty(elementHandle[17].val())) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("Please enter your phone number");
            $('#shipping-ph').css('color','red');
            elementHandle[17].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[17].val())) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("The phone number appears to be invalid, "+
            "numbers only please. ");
            $('#shipping-ph').css('color','red');
            elementHandle[17].focus();
            return false;
        }
        if(elementHandle[17].val().length != 4) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("The phone number must have exactly four digits")
            $('#shipping-ph').css('color','red');
            elementHandle[17].focus();
            return false;
        }
        //////////////// credit card //////////////////////////
        if(isEmpty(elementHandle[18].val())) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("Please enter your credit card Number");
            $('#ccard-num').css('color','red');
            elementHandle[18].focus();
            return false;
        }
        if(!$.isNumeric(elementHandle[18].val())) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("The credit card appears to be invalid, "+
            "numbers only please. ");
            $('#ccard-num').css('color','red');
            elementHandle[18].focus();
            return false;
        }
        if(elementHandle[18].val().length != 16) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("The credit card must have exactly 16 digits")
            $('#ccard-num').css('color','red');
            elementHandle[18].focus();
            return false;
        }

        return true;


    }
    /////// HANDLERS

// on blur, if the user has entered valid data, the error message
// should no longer show.

    elementHandle[0].on('keyup keypress blur change', function() {
        if (isEmpty(elementHandle[0].val())){
            return;
        }else{
            $(this).removeClass("error");
            $('#billing-fname').css('color','black');
            errorStatusHandle.text("");
            }
    });
    elementHandle[1].on('keyup keypress blur change', function() {
        if (isEmpty(elementHandle[1].val())){
            return;
        }else{
            $(this).removeClass("error");
            $('#billing-lname').css('color','black');
            errorStatusHandle.text("");
            }
    });

    elementHandle[2].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[2].val())) {
            return;
        }
        else {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#billing-address1').css('color','black');
        }
    });
    elementHandle[3].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[3].val()))
            return;
        if(!isValidState(elementHandle[3].val())) {
            $(this).removeClass("error");
            $('#billing-city').css('color','black');
        }
    });
    elementHandle[4].change(function() {
        if(isEmpty(elementHandle[4].val()))
            return;
        if(isValidState(elementHandle[4].val())) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#billing-state').css('color','black');
        }
    });
    elementHandle[5].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[5].val()))
            return;
        if(($.isNumeric(elementHandle[5].val())) && (elementHandle[5].val().length == 5)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#billing-zip').css('color','black');
        }
    });
    elementHandle[6].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[6].val()))
            return;
        if(($.isNumeric(elementHandle[6].val())) && (elementHandle[6].val().length == 3)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#billing-acode').css('color','black');
        }
    });
    elementHandle[7].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[7].val()))
            return;
        if(($.isNumeric(elementHandle[7].val())) && (elementHandle[7].val().length == 3)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#billing-preph').css('color','black');
        }
    });
    elementHandle[8].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[8].val()))
            return;
        if(($.isNumeric(elementHandle[8].val())) && (elementHandle[8].val().length == 4)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#billing-ph').css('color','black');

        }
    });

    /////////////////////////////////////////////////////////////////
    ////////////////// Shipping //////////////////////////////////////
        elementHandle[9].on('keyup keypress blur change', function() {
        if (isEmpty(elementHandle[9].val())){
            return;
        }else{
            $(this).removeClass("error");
            $('#shipping-fname').css('color','black');
            errorStatusHandle.text("");
            }
    });
    elementHandle[10].on('keyup keypress blur change', function() {
        if (isEmpty(elementHandle[10].val())){
            return;
        }else{
            $(this).removeClass("error");
            $('#shipping-lname').css('color','black');
            errorStatusHandle.text("");
            }
    });

    elementHandle[11].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[11].val())) {
            return;
        }
        else {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#shipping-address1').css('color','black');
        }
    });
    elementHandle[12].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[12].val()))
            return;
        if(!isValidState(elementHandle[12].val())) {
            $(this).removeClass("error");
            $('#shipping-city').css('color','black');
        }
    });
    elementHandle[13].change(function() {
        if(isEmpty(elementHandle[13].val()))
            return;
        if(isValidState(elementHandle[13].val())) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#shipping-state').css('color','black');
        }
    });
    elementHandle[14].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[14].val()))
            return;
        if(($.isNumeric(elementHandle[14].val())) && (elementHandle[14].val().length == 5)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#shipping-zip').css('color','black');
        }
    });
    elementHandle[15].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[15].val()))
            return;
        if(($.isNumeric(elementHandle[15].val())) && (elementHandle[15].val().length == 3)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#shipping-acode').css('color','black');
        }
    });
    elementHandle[16].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[16].val()))
            return;
        if(($.isNumeric(elementHandle[16].val())) && (elementHandle[16].val().length == 3)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#shipping-preph').css('color','black');
        }
    });
    elementHandle[17].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[17].val()))
            return;
        if(($.isNumeric(elementHandle[17].val())) && (elementHandle[17].val().length == 4)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#shipping-ph').css('color','black');

        }
    });
    elementHandle[18].on('keyup keypress blur change', function() {
        if(isEmpty(elementHandle[18].val()))
            return;
        if(($.isNumeric(elementHandle[18].val())) && (elementHandle[18].val().length == 16)) {
            $(this).removeClass("error");
            errorStatusHandle.text("");
            $('#ccard-num').css('color','black');

        }
    });

    /////////////////////////////////////////////////////////////////


    elementHandle[6].on('keyup', function() {
        if(elementHandle[6].val().length == 3)
            elementHandle[7].focus();
    });

    elementHandle[7].on('keyup', function() {
        if(elementHandle[7].val().length == 3)
            elementHandle[8].focus();
    });

    elementHandle[15].on('keyup', function() {
        if(elementHandle[15].val().length == 3)
            elementHandle[16].focus();
    });

    elementHandle[16].on('keyup', function() {
        if(elementHandle[16].val().length == 3)
            elementHandle[17].focus();
    });


    $(':reset').on('click', function() {
        for(var i=0; i < 19; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
    });
    $(':submit').on('click', function() {
        for(var i=0; i < 19; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
        return isValidData();
    });


});
