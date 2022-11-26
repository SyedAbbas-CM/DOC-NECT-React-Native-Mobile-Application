use db;

CREATE TABLE User(
    userName  VARCHAR(255) NOT NULL UNIQUE,
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
    primary key (userName)
);

CREATE TABLE Doctor(
	docUserName  INTEGER,
    docPoints INTEGER default 0,
    FOREIGN KEY(userName) REFERENCES User(userName)
);

CREATE TABLE Certification(
    docUserName    INTEGER,
    instituteName  VARCHAR(255),
	degreeTitle    VARCHAR(255),
    startDate 	   DATE,
    endDate 	   DATE,
    approvalStatus bool,
    PRIMARY KEY(docUserName),
    FOREIGN KEY(docUserName) REFERENCES Doctor(docUserName)
);

CREATE TABLE History(
	recordId 	   INTEGER AUTO_INCREMENT,
    userName	   VARCHAR(255),
    ailmentName    VARCHAR(255),
    description    TEXT,
    symptoms	   TEXT,
    startDate	   DATE,
    endDate 	   DATE,
	PRIMARY KEY(recordId),
    FOREIGN KEY(userName) REFERENCES User(userName)
);

CREATE TABLE Post(
	postId 		 INTEGER AUTO_INCREMENT,
    userName     INTEGER,
    title  		 VARCHAR(255) NOT NULL,
    body 		 TEXT,
    creationTime timestamp default ( current_timestamp() ),
    PRIMARY KEY(postId),
    FOREIGN KEY(userName) REFERENCES User(userName)
);

CREATE TABLE Comment(
	commentId    	INTEGER AUTO_INCREMENT,
    parentCommentId INTEGER,
    postId       	INTEGER,
	userName 	     	INTEGER,
	body 	     	TEXT,
    upvotes   	 	INTEGER default 0,
    creationTime 	timestamp,
    PRIMARY KEY(commentId),
	FOREIGN KEY(parentCommentId) REFERENCES Comment(commentId),
    FOREIGN KEY(postId) REFERENCES Post(postId),
    FOREIGN KEY(userName) REFERENCES User(userName)    
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
select * from User U, UserProfile Up, Doctor D, Certification C where U.userName = Up.userName and U.userName = D.docUserName and D.docUserName = C.docUserName;
