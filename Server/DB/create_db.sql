use db;

CREATE TABLE User(
	userId   INTEGER AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    pass     VARCHAR(255) NOT NULL,
    joinDate date default ( curdate() ),
    userRole enum('USER', 'DOCTOR') NOT NULL,
    primary key (userId)
);

CREATE TABLE UserProfile(
	userId	  INTEGER,
    firstName VARCHAR(255),
    lastName  VARCHAR(255),
    email     VARCHAR(255) UNIQUE,
    dob 	  DATE,
    city	  VARCHAR(255),
    gender    enum('MALE', 'FEMALE', 'OTHER'),
    about     TEXT,
    PRIMARY KEY(userId),
    FOREIGN KEY (userId) REFERENCES User(userId)
);


CREATE TABLE Doctor(
	doctorId  INTEGER,
    docPoints INTEGER default 0,
    FOREIGN KEY(doctorId) REFERENCES User(userId)
);

CREATE TABLE Certification(
    doctorId 	   INTEGER,
    instituteName  VARCHAR(255),
	degreeTitle    VARCHAR(255),
    startDate 	   DATE,
    endDate 	   DATE,
    approvalStatus bool,
    PRIMARY KEY(doctorId),
    FOREIGN KEY(doctorId) REFERENCES Doctor(doctorId)
);

CREATE TABLE History(
	recordId 	   INTEGER AUTO_INCREMENT,
    userId 		   INTEGER,
    ailmentName    VARCHAR(255),
    symptoms 	   varchar(255),
    current_status enum('CHRONIC', 'TERMINAL', 'CURED'),
	PRIMARY KEY(recordId),
    FOREIGN KEY(userId) REFERENCES User(userId)
);

CREATE TABLE Post(
	postId 		 INTEGER AUTO_INCREMENT,
    userId 		 INTEGER,
    title  		 VARCHAR(255) NOT NULL,
    body 		 TEXT,
    creationTime timestamp default ( current_timestamp() ),
    PRIMARY KEY(postId),
    FOREIGN KEY(userId) REFERENCES User(userId)
);

CREATE TABLE Comment(
	commentId    	INTEGER AUTO_INCREMENT,
    parentCommentId INTEGER,
    postId       	INTEGER,
	userId 	     	INTEGER,
	body 	     	TEXT,
    upvotes   	 	INTEGER default 0,
    creationTime 	timestamp,
    PRIMARY KEY(commentId),
	FOREIGN KEY(parentCommentId) REFERENCES Comment(commentId),
    FOREIGN KEY(postId) REFERENCES Post(postId),
    FOREIGN KEY(userId) REFERENCES User(userId)    
);

insert into User(username, pass, userRole) values('mahad', '123456789', 'USER');
insert into User(username, pass, userRole) values('raahim', '123456789', 'USER');
insert into User(username, pass, userRole) values('abbas', '123456789', 'USER');
insert into User(username, pass, userRole) values('abdullah', '123456789', 'USER');
insert into User(username, pass, userRole) values('siraj', '123456789', 'USER');
insert into User(username, pass, userRole) values('aimel', '123456789', 'DOCTOR');

insert into UserProfile values(1, 'mahad', 'hameed', 'mahad@docnet.com', str_to_date('16/10/2002', '%d/%m/%Y'), 'Karachi', 'MALE', NULL); 
insert into UserProfile values(2, 'raahim', 'siddiqi', 'raahim@docnet.com',  str_to_date('4/4/2001', '%d/%m/%Y'), 'Karachi', 'OTHER', NULL); 
insert into UserProfile values(3, 'syed', 'abbas','abbas@docnet.com', str_to_date('27/6/2001', '%d/%m/%Y'), 'Karachi', 'FEMALE', NULL); 
insert into UserProfile values(4, 'abdullah', 'faisal', 'abdullah@muggle.com', str_to_date('18/3/2002', '%d/%m/%Y'), 'Karachi', 'MALE', NULL);
insert into UserProfile values(5, 'siraj', 'ahmed', 'siraj@muggle.com', str_to_date('28/8/2001', '%d/%m/%Y'), 'Karachi', 'MALE', NULL);
insert into UserProfile values(6, 'aimel', 'uqba', 'aimel@muggle.com', str_to_date('7/3/1996', '%d/%m/%Y'), 'Karachi', 'FEMALE', NULL);

insert into Doctor values(6, 100);

insert into Certification values(6, 'DOW', 'MBBS',  str_to_date('1/1/2013', '%d/%m/%Y'), str_to_date('1/1/2018', '%d/%m/%Y'), true);

show tables;

drop table User;
drop table UserProfile;
drop table Certification;
drop table Doctor;
drop table History;
drop table Post;
drop table Comment;

desc User;
desc UserProfile;
desc Doctor;
desc Certification;
desc History;
desc Post;
desc Comment;

select * from User;
select * from UserProfile;
select * from Doctor;
select * from Certification;
select * from User U, UserProfile Up, Doctor D, Certification C where U.userId = Up.userId and U.userId = D.doctorId and D.doctorId = C.doctorId;
