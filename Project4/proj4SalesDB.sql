use jadrn030;

drop table if exists proj4sales;

CREATE TABLE proj4sales(
 id                 int(11) NOT NULL PRIMARY KEY,
 sku                char(9)  NOT NULL,
 qty                int(4)   NOT NULL,          
 title              varchar(100)   NOT NULL,                            
 cost               decimal(6,2)   NOT NULL,           
 retail             decimal(6,2)   NOT NULL);           


