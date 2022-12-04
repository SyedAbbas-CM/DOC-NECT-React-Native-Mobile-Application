use db;

CREATE TABLE User(
    userName  VARCHAR(255),
    pass      VARCHAR(255) NOT NULL,
	userRole  enum('USER', 'DOCTOR') NOT NULL,
    firstName VARCHAR(255),
    lastName  VARCHAR(255),
    email     VARCHAR(255) UNIQUE,
    dob 	  DATE,
    city	  VARCHAR(255),
    gender    enum('MALE', 'FEMALE', 'OTHER'),
    about     TEXT,
    theme     enum('DARK', 'LIGHT'),
    privacy   enum('0', '1', '2'),
    primary key (userName)
);

CREATE TABLE Doctor(
	userName  VARCHAR(255),
    docPoints INTEGER default 0,
    PRIMARY KEY(userName),
    FOREIGN KEY(userName) REFERENCES User(userName)
);

CREATE TABLE Certification(
    userName    VARCHAR(255),
    instituteName  VARCHAR(255),
	degreeTitle    VARCHAR(255),
    startDate 	   DATE,
    endDate 	   DATE,
    PRIMARY KEY(docUserName),
    FOREIGN KEY(docUserName) REFERENCES Doctor(userName)
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
    userName     VARCHAR(255),
    title  		 VARCHAR(255) NOT NULL,
    category     enum("1","2","3","4","5","6","7","8","9","10"),
    body 		 TEXT,
    creationTime timestamp default  current_timestamp() ,
    PRIMARY KEY(postId),
    FOREIGN KEY(userName) REFERENCES User(userName)
);

CREATE TABLE Comment(
	commentId    	INTEGER AUTO_INCREMENT,
    parentCommentId INTEGER,
    postId       	INTEGER,
	userName 	    VARCHAR(255),
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

insert into User(userName,pass,userRole,firstname,lastName,email) values("Raahim","1234","USER","Raahim","Siddique","Retard@gmail.com");
insert into User(userName,pass,userRole,firstname,lastName,email) values("Uname","12345","USER","FNAME","LANAME","Email@email.com");
insert into User(userName,pass,userRole,firstname,lastName,email) values("Mahad","12345","USER","Mahad","Ham","Email2@email.com");
insert into User(userName,pass,userRole,firstname,lastName,email) values("Abbas","12345","USER","Raahim","......","Email3@email.com");
insert into User(userName,pass,userRole,firstname,lastName,email) values("DOCTORBRO","12345","DOCTOR","Raahim","......","doc@email.com");

insert into  Post(username,title,category,body) values("Raahim","Hello DOCNET","1","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Abbas","Selling Drugs at address...","3","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Mahad","So how much do i need to take to OD ","1","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","Selling GF","3","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","Hello i peed my pants what do i do","6","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","HELP LOW LIBIDO","9","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","My 77 year old mother went into hospital with meningitis yesterday. What are her chances of surviving?","9","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","Sharp quick stomach pain","1","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Raahim","Hello Please help looking for advice with cancer concerns male age 22","1","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Raahim","Hello My Ass Really hurts; what do i do ???","7","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Mahad","Please help looking for advice with cancer concerns male age 22","1","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","12/F body pains, memory loss, rapid heartbeat.","2l","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","Toddler may have swallowed piece of shoelace aglet","3","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","Is it possible to have a weak pharynx compared to other people?","4","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","At what point should I seek further medical treatment? Cellulitis on finger.","5","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Raahim","Enlarged tonsils blocking my airway when I sleep.","6","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Uname","Female, 300lb, 32, Taking 50 mg sertraline daily. - I have had a splitting sore throat like I swallowed broken glass for 3 days along with a fever and swollen lymph nodes. Now there are white spots in my throat. Is this likely strep or tonsil stones maybe?","7","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Raahim","Am I wrong in thinking that my doctor relatives abuse antibiotic prescriptions?","8","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Raahim","tachycardia. Is It dangerous to work with beats at 140?","9","daddadadadadadadadadadadd");
insert into  Post(username,title,category,body) values("Raahim","Accidentally took medication that is positively changing my life. How to get a legit script for it?","10","daddadadadadadadadadadadd");

insert into  Comment(postId,userName,body,upvotes) values("1","Raahim","COMMENTING TEST1",2);
insert into  Comment(postId,parentCommentId,userName,body,upvotes) values("1","2","Abbas","COMMENTING TEST2",2);
insert into  Comment(postId,userName,body,upvotes) values("1","Mahad","COMMENTING TEST3",2);
insert into  Comment(postId,userName,body,upvotes) values("1","Uname","COMMENTING TEST4",2);
insert into  Comment(postId,userName,body,upvotes) values("1","Uname","COMMENTING TEST5",2);
insert into  Comment(postId,userName,body,upvotes) values("1","DOCTORBRO","DOCTORS CP<<EMT",2);


DELIMITER //
CREATE PROCEDURE certifyUser(IN in_userName VARCHAR(255), IN in_instituteName VARCHAR(255), IN in_degreeTitle VARCHAR(255), IN in_startDate DATE, IN in_endDate DATE)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
		UPDATE User set userRole = 'DOCTOR' WHERE userName = in_userName;
		INSERT INTO Doctor VALUES(in_userName, 0);
		INSERT INTO Certification VALUES(in_userName, in_instituteName, in_degreeTitle, in_startDate, in_endDate);
    COMMIT;
END;
//
DELIMITER ;