/*  We load the global array proj4_data once, then use it as needed
    to retrieve product information.

    The Milk Chocolate handler is done the old-fashion way, with an
    'onclick' call in the xhtml code.  The rest of the buttons have
    handlers assigned the correct way.

    Alan Riggins
    CS545
    Fall 2016
*/



var proj4_data;
var cart;

$(document).ready(function() {
    proj4_data = new Array();
    $.get('/perl/jadrn030/proj4/get_products.cgi', storeData);

    cart = new shopping_cart("jadrn030");


    // alert("Inside checkout.j");


    //////////////////////////////////////////////////

    $( "#dialog-modal" ).dialog({
            height: 700,
            width: 900,
            modal: true,
            autoOpen: false
    });

    $('#order_button').on('click', function($e) {
        $("#dialog-modal").dialog('open');
    });
    $('#backtoShopping').on('click', function($e) {
        window.open('products.html', '_self');
    });





});

//////////////////////
//// Update the Cart
function updateCart(){
    // console.log(proj4_data);
    // console.log(proj4_data.length);
    // console.log(proj4_data[0]);
    var costArray = [];
    var totalBeforeTax = 0.0;
    var total = 0.0;
    ///////////////////////////////////////////////////
    var itmTable = "";
	if(cart.size() < 1){
        itmTable += "<table id=\"cartTable\">\n";
		itmTable += "<tr><td></td><td class='shopping-cart-empty'>Shopping cart is empty</td><td></td></tr>";
        itmTable += "</table>\n";
		$('#checkoutButton').hide();
	}
	else {
        var itemArray = cart.getCartArray();
        itmTable += "<table id=\"cartTable\">\n";
        itmTable += "<tr><th>Name</th><th>SKU</th><th>Price</th><th>Quantity/Update</th></tr>";
        itmTable += "<tr><th><hr/></th><th><hr></th><th><hr/></th><th><hr/></th></tr>";

        for (var i = 0; i < itemArray.length; i++) {
            for (var j = 0; j < proj4_data.length; j++) {
                if (proj4_data[j][0] == itemArray[i][0]) {
                    itmTable += "<tr>";
                    itmTable += "<td>" + proj4_data[j][2] + "</td>";
                    itmTable += "<td>" + proj4_data[j][0] + "</td>";
                    itmTable += "<td> $" + (parseFloat(proj4_data[j][6])*parseInt(itemArray[i][1])).toFixed(2) + "</td>";
                    costArray.push((parseFloat(proj4_data[j][6])*parseInt(itemArray[i][1])).toFixed(2));
                    itmTable += "<td>\n <input type='text' name=\""+itemArray[i][0]+"\" value="+itemArray[i][1]+" class='qty' />\n";
                    itmTable += " <input type='button' value='-' class='qtyminus' field=\""+itemArray[i][0]+"\" />\n";
                    itmTable += " <input type=\"button\" value=\"+\" class=\"qtyplus\" field=\""+itemArray[i][0]+"\" /></td>\n";
                    itmTable += "<td> <input type=\"image\" src=\"./img/ic_autorenew_white_24dp_2x.png\" id=\""+itemArray[i][0]+"\" class=\"updateBtn\" /></td>\n";
                    itmTable += "<td> <input type=\"image\" src=\"./img/ic_delete_white_24dp_2x.png\" id=\""+itemArray[i][0]+"\" class=\"delBtn\" /></td>\n";
                    itmTable += "</tr>\n";
                }
            }
        }
        itmTable += "</table>\n";

        // console.log(costArray);

        for(var i in costArray)
            totalBeforeTax += parseFloat(costArray[i]);


        // console.log(totalBeforeTax);
        total = ((totalBeforeTax * 1.08) + 2.00).toFixed(2);



        itmTable += "<br />\n";
        itmTable += "<table id=\"checkOutTable\">\n";
        itmTable += "<tr><td><hr></td></tr>\n";
        itmTable += "<tr>\n";
        itmTable += "<td>Total before tax:</td>\n";
        itmTable += "<td id=\"beforeTax\">$"+totalBeforeTax+"</td>\n";
        itmTable += "</tr>\n";
        itmTable += "<tr>\n";
        itmTable += "<td>Estimated tax to be collected (8%):</td>\n";
        itmTable += "<td id=\"tax\">$"+(totalBeforeTax*0.08).toFixed(2)+"</td>\n";
        itmTable += "</tr>\n";
        itmTable += "<tr>\n";
        itmTable += "<td>Shipping &amp; handling ($2 per item): </td>\n";
        itmTable += "<td id=\"shipping\">$2.00</td>\n";
        itmTable += "</tr>\n";
        itmTable += "<tr>\n";
        itmTable += "<td><hr></td>\n";
        itmTable += "<td></td>\n";
        itmTable += "</tr>\n";
        itmTable += "<tr>\n";
        itmTable += "<td id=\"orderTitle\">Order Total:</td>\n";
        itmTable += "<td id=\"finalCost\">$"+total+"</td>\n";
        itmTable += "</tr>\n";
        itmTable += "</table>\n";
    }
    var handle = document.getElementById('shoppingCart');
    handle.innerHTML = itmTable;

    updateQty();
}

function updateQty(){
    $('.updateBtn').on('click',function () {
        var sku = $(this).attr('id');
        console.log(sku);
        var qty = $("[name=\"" +sku+"\"]").val();
        console.log(qty);
        if(qty == 0){
            cart.delete(sku);
            updateCart();
        }
        cart.setQuantity(sku,qty);
        $('#cartCount').text(cart.size());
        updateCart();
    });
    $('.qtyplus').on('click',function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($("[name=\""+fieldName+"\"]").val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $("[name=\""+fieldName+"\"]").val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $("[name=\""+fieldName+"\"]").val(1);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").on('click',function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($("[name=\""+fieldName+"\"]").val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 1) {
            // Decrement one
            $("[name=\""+fieldName+"\"]").val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $("[name=\""+fieldName+"\"]").val(1);
        }
    });
    $('.delBtn').on('click',function () {
        var sku = $(this).attr('id');
        cart.delete(sku);
        $('#cartCount').text(cart.size());
        updateCart();
    });
}


    function storeData(response) {
        var tmpArray = explodeArray(response,';');
        for(var i=0; i < tmpArray.length; i++) {
            innerArray = explodeArray(tmpArray[i],'|');
            proj4_data[i] = innerArray;
        }
        $('#cartCount').text(cart.size());
        updateCart();
    }

    function display_milk_chocolate() {

        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Milk chocolate") {
                tmpString += "<img src=\"/~jadrn030/PROJ4_IMAGES/"+
                    proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                    " width=\"200px\"  /><br />";
                for(var j=0; j < proj4_data[i].length; j++)
                    tmpString += proj4_data[i][j] + "<br />";
                tmpString += "<br /><br />";
            }
        }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    }
    function displayItems(itemName) {

        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Milk chocolate") {
                tmpString += "<img src=\"/~jadrn030/PROJ4_IMAGES/"+
                    proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                    " width=\"200px\"  /><br />";
                for(var j=0; j < proj4_data[i].length; j++)
                    tmpString += proj4_data[i][j] + "<br />";
                tmpString += "<br /><br />";
            }
        }
        var handle = document.getElementById('content');
        handle.innerHTML = tmpString;
    }

// from http://www.webmasterworld.com/forum91/3262.htm
function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
}
