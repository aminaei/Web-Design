use jadrn030;

drop table if exists runner;

create table runner(
    id int AUTO_INCREMENT PRIMARY KEY,
    category varchar(20) NOT NULL,
    experience varchar (20) NOT NULL,
    fname varchar(50) NOT NULL,
    mname varchar(50),
    lname varchar(50) NOT NULL,
    birthdate DATE NOT NULL,
    gender varchar(10) NOT NULL,
    address varchar(100) NOT NULL,
    city varchar(30) NOT NULL,
    state char(2) NOT NULL,
    zip char(5) NOT NULL,
    phnumber varchar(10) NOT NULL,
    email varchar(50) NOT NULL,
    textarea varchar(200) );

    INSERT INTO runner VALUES(0,'adult','expert','Jim',NULL,'Robeson','1970-03-04','male','3456 30th St','San Diego','CA','92104','1234567890','jrobeson@yahoo.com',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Robert',NULL,'Jones','1970-03-04','male','1512 Abbott St','San Diego','CA','92106','1234567890','rjones@gmail.com',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Henry',NULL,'Carter','1970-03-04','male','914 Albion St','San Diego','CA','92106','1234567890','hcarter@yahoo.com',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Jason',NULL,'Johnson','1970-03-04','male','225 7th St','San Diego','CA','92103','1234567890','jjson@gmail.com',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Sarah',NULL,'Joseph','1970-03-04','male','9339 Via Rapida St','San Diego','CA','92101','1234567890','sjoseph22@yahoo.com',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Bill',NULL,'Krump','1970-03-04','male','1445 Camino Del Rio','San Diego','CA','92108','1234567890','bkrmp@gmail.com',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Matt',NULL,'Mathison','1970-03-04','male','887 10 St','San Diego','CA','92101','1234567890','mmathison12@gmail.com',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Sam',NULL,'Stevens','1970-03-04','male','6782 Ivy St','San Diego','CA','92103','1234567890','sam.stevens@gmail.com',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Jerome',NULL,'Jacobs','1970-03-04','male','5354 Maple St','San Diego','CA','92103','1234567890','jjacobs@mail.sdsu.edu',NULL);
    INSERT INTO runner VALUES(0,'adult','expert','Adam',NULL,'Selig','1970-03-04','male','3634 7th Ave','San Diego','CA','92103','1234567890','superstar156@yahoo.com',NULL);
