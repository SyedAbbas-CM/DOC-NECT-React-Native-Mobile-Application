use db;

CREATE TABLE User(
	userId    INTEGER AUTO_INCREMENT,
    username  VARCHAR(255) NOT NULL UNIQUE,
    pass      VARCHAR(255) NOT NULL,
	userRole  enum('USER', 'DOCTOR') NOT NULL,
    firstName VARCHAR(255),
    lastName  VARCHAR(255),
    email     VARCHAR(255) UNIQUE,
    dob 	  DATE,
    city	  VARCHAR(255),
    gender    enum('MALE', 'FEMALE', 'OTHER'),
    about     TEXT,
    joinDate date default ( curdate() ),
    primary key (userId)
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
    startDate	   DATE,
    endDate 	   DATE,
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

show tables;

drop table User;
drop table Certification;
drop table Doctor;
drop table History;
drop table Post;
drop table Comment;

desc User;
desc Doctor;
desc Certification;
desc History;
desc Post;
desc Comment;

select * from User;
select * from Doctor;
select * from Certification;
select * from User U, UserProfile Up, Doctor D, Certification C where U.userId = Up.userId and U.userId = D.doctorId and D.doctorId = C.doctorId;
