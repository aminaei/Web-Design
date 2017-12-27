#!/usr/bin/perl  

use CGI;
use CGI::Cookie;
use DBI;

####################################
### connect to opatija  
my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "proj4";
my $username = "jadrn030";
my $password = "sweet";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

####### write to jadrn030 DB proj4sales Tables
my $database_wrt = "jadrn030";
my $database_source_wrt = "dbi:mysql:$database_wrt:$host:$port";

	
my $dbh_wrt = DBI->connect($database_source_wrt, $username, $password) 
or die 'Cannot connect to db';

#############################################

$q = new CGI;


#send a blank cookie.  You must insert this into the header before
#printing anything.  Also, using the CGI module makes printing
#content-type: text/html redundant.

my $cookie = $q->cookie(-name=>'jadrn030',-value=>'',-path=>'/');
print $q->header(-cookie=>$cookie);
print <<END_CONTENT;
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

  <head>
    <meta charset="utf-8">
    <title>Bertha&rsquo;s Deluxe Chocolates</title>
  </head>

<body>
    <div>
     <h1>Bertha&rsquo;s Deluxe Chocolates</h1>
    <h2>Thank you for order, your order has been placed.</h2>
    <table>
        <tr>
            <td>Items</td>
            <td>Quantity</td>
            <td>Total</td>
        </tr>
        <tr>
          <th><hr/></th>
          <th><hr></th>
          <th><hr/></th>
        </tr>
END_CONTENT
my $totalBeforeTax =0.0;
my $total = 0.0;

my %cookies = $ENV{COOKIE};
for( keys %cookies) {
#print "The value of the cookie is: $cookies{$_}\n";
}

#print "<table>\n";
my ($key, $value);
     
%cookies = CGI::Cookie->fetch;
for(keys %cookies) {
#    print "$cookies{$_}\n";
    }
    
#print "<h1>Shopping cart cookie</h1>";
my $v = $q->cookie('jadrn030');
#print "The raw cookie value is $v<br />";   
@rows = split('\|\|',$v);
foreach $row (@rows) {
    ($sku, $qty) = split('\|',$row);
 #   print "$sku = $qty<br />";
     
    
#############################
### fetch produce info from DB with sku
#print "$sku <br />";
my $myquery ="select * from products where sku='$sku'";
my $sth = $dbh->prepare($myquery);
$sth->execute();

while (my @results = $sth->fetchrow_array) {
my $id = time;
my $title = $results[2];
my $cost = $results[5];
my $price = $results[6];

$totalBeforeTax = $totalBeforeTax + ($price * $qty);

print "<tr>";
print "<td>$title</td>";
print "<td>$qty</td>";
print "<td>$totalBeforeTax</td>";
print "</tr>";

#print "id = $id <br/>\n";
#print "sku = $sku <br/>\n";
#print "qty = $qty <br/>\n";
#print "title = $title <br/>\n";
#print "cost = $cost <br/>\n";
#print "retail = $price <br/>\n";

$dbh_wrt->do('INSERT INTO proj4sales (id,sku,qty,title,cost,retail) VALUES (?, ?, ?,?,?,?)',
  undef,
  $id,$sku,$qty,$title,$cost,$price);
#print time,"<br\>\n";
#print "Inside of while loop <br\>\n";
#print "$results[0] <br/>";
#print "$results[1] <br/>";
}
} # EOF foreach loop line 66
##############################
### Close DB connection
#$sth_wrt->finish();
# $sth->finish();
$dbh->disconnect();
$dbh_wrt->disconnect();
#####################################
        
print "<tr><th><hr/></th></tr>\n";
print "<tr><th></th></tr>\n";

print "<tr></tr>\n";
print "<tr>\n";
print "<td>Total befor Tax: </td>\n";
print "<td></td>\n";
print "<td>$totalBeforeTax</td>\n";
print "</tr>\n";

print "<tr>\n";
print "<td>Estimated Tax (8%): </td>\n";
print "<td></td>\n";
my $tax = $totalBeforeTax * 0.08;
print "<td>$tax</td>\n";
print "</tr>\n";

print "<tr>\n";
print "<td>Shipping & handling (\$2 per item):</td>\n";
print "<td></td>\n";
print "<td>\$2</td>\n";
print "</tr>\n";
print "<tr>\n";
print "<th><hr/></th>\n";
print "</tr>\n";

$total =$totalBeforeTax + $tax + 2.00;
print "<tr>\n";
print "<td>Total</td>\n";
print "<td></td>\n";
print "<td>$total</td>\n";
print "</tr>\n";
print "<tr></tr>\n";
print "<tr></tr>\n";

print "<tr>\n";
print "<td>Ship To:</td>\n";
print "</tr>\n";   
print "<br/>\n"; 

my ($key, $value);

                
foreach $key ($q->param) {

    if($key =~/shipping-address1|shipping-address2|shipping-city|shipping-state|shipping-zip/){
    print "<tr>\n";
    
    #print "<td>$key</td>\n";
    foreach $value ($q->param($key)) {
        print "<td>$value</td>\n";
        }
    print "</tr>\n";
    }
}
print "</table>\n";
print "</div>\n";
print "<br/>\n";
print "<p> *** Sales data is saved to MySQL:jadrn030 -> proj4sales Table. ***</p><br/>\n";
print "</body>\n";
print "</html>\n";
#foreach $key ($q->param) {
#    print "<tr>\n";
#    print "<td>$key</td>\n";
#    foreach $value ($q->param($key)) {
#        print "<td>$value</td>\n";
 #       }
 #   print "</tr>\n";
#}
#print "</table>\n";
#print "</div>\n";
#print "</body>\n";
#print "</html>\n";



