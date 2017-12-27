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
var shoppingCart = [];
var Item = function(sku,title,shortDedc,longDesc,cost){
    this.sku = sku;
    this.title = title;
    this.shortDedc = shortDedc;
    this.longDesc = longDesc;
    this.cost = cost;
}

$(document).ready(function() {
    proj4_data = new Array();
    $.get('/perl/jadrn030/proj4/get_products.cgi', storeData);

    cart = new shopping_cart("jadrn030");

    $('#navi li').click(function(){
        $('.highlight').removeClass('highlight');
    $(this).addClass('highlight');
    
    });
    //////////////   Fetch Items    //////////////////
    $('#milk').on('click', function() {
        fetchItm("Milk chocolate");
        // console.log(shoppingCart);

    });
    $('#dark').on('click', function() {
        fetchItm("Dark chocolate");

    });
    $('#nuts').on('click', function() {
        fetchItm("Nuts and chews");

    });
    $('#brittle').on('click', function() {
        fetchItm("Brittles and toffies");

    });
    $('#truffles').on('click', function() {
        fetchItm("Truffles");

    });
    $('#gifts').on('click', function() {
        fetchItm("Gifts");

    });
    $('#holiday').on('click', function() {
                fetchItm("Holiday assortments");
    });
    //////////////////////////////////////////////////
    $('#maincontent').on('click', function(e) {
    if($(e.target).val() != 'Add to Cart') return;
    // alert("The SKU is " + $(e.target).attr("field"));
        var sku = $(e.target).attr("field");

        var qty = parseInt($("[name=\""+sku+"\"]").val());
        console.log(qty);
        cart.add(sku, qty);
        $('#cartCount').text(cart.size());

        uidialogBox(sku,qty);
        $("#ui-dialog").dialog('open');
        // window.open('cart.html', '_self');
    });


    $("#ui-dialog").dialog({
        height: 550,
        width: 700,
        modal: true,
        autoOpen: false,
        buttons: [{text: "Continue Shopping", click: function()
           {window.open('products.html','_self');}},

        {text: "Proceed to Checkout", click: function()
           {window.open('cart.html','_self');}}
        ]
    });







    ///////////////////////////////////////////////////////////
    //     $('#milk').on('click', function() {
    // This button will increment the value
    $(document).on('click',".qtyplus",function(e){
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
    $(document).on('click',".qtyminus",function(e){
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

});

function uidialogBox(sku,qty){
    var title;
    var shortDedc;
    var longDesc;
    var price;
    var html="";
    for(var i in shoppingCart){
        if(shoppingCart[i].sku == sku){
            title = shoppingCart[i].title;
            shortDedc = shoppingCart[i].shortDedc;
            longDesc = shoppingCart[i].longDesc;
            price = shoppingCart[i].cost;
        }
    }

    // html += "<div class=\"ui-widget\">\n";
    /* Title: */
    html += "<h3 class=\"ui-title\">"+title+"</h3>\n";
    html += "<div id=\"ui-img\">\n";
    html += "<img src=\"./PROJ4_IMAGES/"+sku+".jpg\" alt=\""+title+"\""+" width=\"200px\"  /><br />";
    html += "</div> \n";
    html += "<div id=\"ui-longDesc\">\n";

    /* Description: */
    html += "<p>Description:  "+longDesc +"</p> \n";
    /* SKU: */
    html += "<p>SKU: "+sku +"</p> \n";
    /* Price*/
    html += "<p>Price: $"+price +"</p> \n";
    html += "<p>Quantity: "+qty +"</p> \n";

    html += "</div>\n";
    html += "<div id=\"ui-qty\">\n";
    // html += "<input type='button' value='Proceed to Checkout' id='ui-chekoutBtn' class='ui-btn' />\n";
    // html += "<input type='button' value='Continue Shopping' id='ui-shopBtn' class='ui-btn' />\n";
    html += "</div>\n";
    // html += "</div>  <!-- end ui-widget -->\n";
    var handle = document.getElementById('ui-dialog');
    handle.innerHTML = html;




}


function fetchItm(ItemName){

    tmpString = "";
    shoppingCart = [];
    for(var i=0; i < proj4_data.length; i++) {
        // console.log(proj4_data);

        if(proj4_data[i][1] == ItemName) {

                tmpString += "<div class=\"item\">\n";
                /* Title: */
                tmpString += "<h3 class=\"openProduct\">"+proj4_data[i][2]+"</h3>\n";
                tmpString += "<div id=\"itemImg\">\n";
                tmpString += "<img src=\"./PROJ4_IMAGES/"+proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+" width=\"200px\"  /><br />";
                tmpString += "</div> \n";
                tmpString += "<div id=\"itemDescr\">\n";

                /* Description: */
                tmpString += "<p>Description: "+proj4_data[i][4] +"</p> \n";
                /* SKU: */
                tmpString += "<p>SKU: "+proj4_data[i][0] +"</p> \n";
                /* Price*/
                tmpString += "<p>Price: $"+proj4_data[i][6] +"</p> \n";

                tmpString += "</div>\n";
                tmpString += "<div id=\"addQty\">\n";
                tmpString += "<input type='text' name=\""+proj4_data[i][0]+"\" value='1' class='qty' />\n";
                tmpString += "<input type='button' value='-' class='qtyminus' field=\""+proj4_data[i][0]+"\"/>\n";
                tmpString += "<input type='button' value='+' class='qtyplus' field=\""+proj4_data[i][0]+"\"/>\n";
                tmpString += "<input type='button' value='Add to Cart' id='addButton' class='btn' field=\""+proj4_data[i][0]+"\"/>\n";
                tmpString += "</div>\n";
                tmpString += "</div>  <!-- end ui-widget -->\n";

                var item = new Item (proj4_data[i][0],proj4_data[i][2],proj4_data[i][3],proj4_data[i][4],proj4_data[i][6]);
                shoppingCart.push(item);

        }
    }
    //console.log(shoppingCart);
    var handle = document.getElementById('maincontent');
    handle.innerHTML = tmpString;
}

function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
    }
    fetchItm("Milk chocolate");
    $('#cartCount').text(cart.size());
}

    function display_milk_chocolate() {

        tmpString = "";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Milk chocolate") {
                tmpString += "<img src=\"./PROJ4_IMAGES/"+
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
                tmpString += "<img src=\"./PROJ4_IMAGES/"+
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
