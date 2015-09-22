CREATE DATABASE IF NOT EXISTS forms;

USE forms;

CREATE TABLE IF NOT EXISTS activities(
	activityid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	activityname TEXT NOT NULL,
	compname VARCHAR(30) NOT NULL,
	proprietorname VARCHAR(30),
	oppaddr VARCHAR(100) NOT NULL,
	persaddr VARCHAR(100),
	contact VARCHAR(15) NOT NULL,
	costoff INT,
	costpeak INT,
	licences enum('YES','NO') DEFAULT 'NO' NOT NULL,
	safety VARCHAR(100),
	participents INT,
	durationofactivity INT,
	instructor enum('YES','NO') DEFAULT 'NO'
);

CREATE TABLE IF NOT EXISTS homestay(
	homestayid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ownername VARCHAR(30) NOT NULL,
	occupation VARCHAR(30) NOT NULL,
	fth enum('YES','NO') DEFAULT 'NO' NOT NULL,
	email VARCHAR(30),
	phno VARCHAR(15) NOT NULL,
	persoaddr VARCHAR(100),
	costoff INT,
	costpeak INT,
	paymethod VARCHAR(10),
	propname VARCHAR(30),
	propaddr VARCHAR(100) NOT NULL,
	aboutprop TEXT,
	city VARCHAR(20),
	floor VARCHAR(20),
	proptype VARCHAR(40),
	occupancy VARCHAR(10),
	ownerstayprop enum('YES','NO') DEFAULT 'NO',
	caretaker enum('YES','NO') DEFAULT 'NO',
	amenities VARCHAR(30),
	breakfast VARCHAR(30),
	lunch VARCHAR(30),
	dinner VARCHAR(30),
	aos VARCHAR(30),
	checkin DATETIME,
	checkout DATETIME,
	staytime INT,
	cancpolicy TEXT,
	travtype VARCHAR(30),
	famitype VARCHAR(30),
	foodpref VARCHAR(30),
	smoking enum('YES','NO') DEFAULT 'NO',
	alcohol enum('YES','NO') DEFAULT 'NO',
	pets enum('YES','NO') DEFAULT 'NO',
	langpref VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS hotelform(
	hotelformid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	designation VARCHAR(30),
	email VARCHAR(30),
	phno VARCHAR(15) NOT NULL,
	persoaddr VARCHAR(100),
	hotelname VARCHAR(30) NOT NULL,
	hoteladdr VARCHAR(30) NOT NULL,
	abouthotel TEXT,
	city VARCHAR(30),
	numoffloor INT,
	numofrooms INT,
	numofbed INT,
	addbed INT,
	checkin DATETIME,
	checkout DATETIME,
	staytime INT,
	costoff INT,
	costpeak INT,
	paymethod VARCHAR(30),
	cancpolicy TEXT,
	occupancy VARCHAR(30),
	amenities VARCHAR(30),
	aos VARCHAR(30),
	breakfast VARCHAR(30),
	lunch VARCHAR(30),
	dinner VARCHAR(30),
	foodpref VARCHAR(30),
	smoking enum('YES','NO') DEFAULT 'NO',
	alcohol enum('YES','NO') DEFAULT 'NO',
	pets enum('YES','NO') DEFAULT 'NO',
	langpref VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS transport(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	compname VARCHAR(30) NOT NULL,
	addr VARCHAR(100) NOT NULL,
	contactmob VARCHAR(15),
	phno VARCHAR(15),
	selfdavail enum('YES','NO') DEFAULT 'NO',
	chauffeurdrivavail enum('YES','NO') DEFAULT 'NO',
	vehicaltype VARCHAR(30),
	taxi VARCHAR(30),
	bike VARCHAR(30),
	chargesselfdriven INT,
	chargeschauffeur INT,
	coach enum('YES','NO') DEFAULT 'NO',
	coachtype VARCHAR(30),
	seatingcapcoach INT,
	coachcharge TEXT,
	nightcharg TEXT,
	bikecharge INT,
	permitavail enum('YES','NO') DEFAULT 'NO',
	waitingcharge TEXT,
	GPS enum('YES','NO') DEFAULT 'NO'
	);

CREATE TABLE IF NOT EXISTS watersports(
	wsid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	compname VARCHAR(30) NOT NULL,
	proprietorname VARCHAR(30) NOT NULL,
	oppaddr VARCHAR(100),
	persoaddr VARCHAR(100),
	phno VARCHAR(15),
	waterspooff VARCHAR(30),
	lifejackavail enum('YES','NO') DEFAULT 'NO',
	busslicences enum('YES','NO') DEFAULT 'NO',
	actfg VARCHAR(30),
	jetskidet TEXT,
	snorkelingdet TEXT,
	bananaboatridedet TEXT,
	speedboatdet TEXT,
	parasaildet TEXT,
	waterskidet TEXT,
	windsurfdet TEXT,
	saildet TEXT,
	scubadivdet TEXT,
	kayakingdet TEXT,
	canoeingdet TEXT,
	kitesurfingdet TEXT,
	actneedswim TEXT
);

