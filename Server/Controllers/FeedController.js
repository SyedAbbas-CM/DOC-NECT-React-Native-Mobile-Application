const User = require("../Model/user.model");
const asyncWrapper = require('../middleware/async')
const db = require('./../DB');

const GetPosts = asyncWrapper(async (req, res,next) => {
    console.log(req.query)
    const sql = `SELECT postId,title,userName,category,creationTime,body FROM Post`
    db.query(sql,(err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Retrieved Posts")
            console.log(data)
            res.status(200).json(data)
        }
        //(!err? null : err, data);

    });
})

const GetPost = asyncWrapper(async (req, res,next) => {
    console.log(req.query)
    const sql = `SELECT postId,title,userName,body  FROM Post where postId = ? `
    db.query(sql,[req.params.postId],(err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Retrieved Post")
            //console.log(data)
            res.status(200).json(data)
        }
        //(!err? null : err, data);

    });
})

const CreatePost = asyncWrapper(async (req, res,next) => {
    console.log(req.body)
     const sql = `INSERT into Post(username,title,category,body) values(?,?,?,?)`
     db.query(sql,[req.body.userName,req.body.title,req.body.category,req.body.body], (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Created Post")
            console.log(data)
            res.status(200).json(data)
        }
    });
})
const EditPost = asyncWrapper(async (req, res,next) => {
    console.log(req.body)
     const sql = `UPDATE Post set title = ? , body = ?  where postId = ?`
     db.query(sql,[req.body.title,req.body.body,req.query.postId] ,(err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Updated Post")
            console.log(data)
            res.status(200).json(data)
        }
    });
})
const DeletePost = asyncWrapper(async (req, res,next) => {
    console.log(req.query)
     const sql = `Delete from Post where postId = ?`
     db.query(sql,[req.query.postId], (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Deleted Post")
            console.log(data)
            res.status(200).json(data)
        }
    });
})
const GetComments = asyncWrapper(async (req, res,next) => {
    const sql = `SELECT userRole,c.commentId,c.userName,c.body,c.upvotes,c.creationTime,c.parentCommentId
    FROM Comment c  join User u 
    on c.userName = u.userName  where postId = ? ;
    `
    db.query(sql,[req.params.postId], (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Retrived Comments")
            //console.log(data)
            res.status(200).json(data)
        }
        //(!err? null : err, data);

    });
})
const PostComment = asyncWrapper(async (req, res,next) => {
    const sql = `insert into  Comment(postId,userName,body,parentCommentId) values(?,?,?,?);`
    console.log(req.body)
    db.query(sql,[req.body.postId,req.body.userName,req.body.body,req.body.parentCommentId], (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Created COMMENT!")
            console.log(data)
            res.status(200).json(data)
        }
        //(!err? null : err, data);

    });
})

const DeleteComment = asyncWrapper(async (req, res,next) => {
    const sql = `Delete from Comment where commentId = ?`
    db.query(sql,[req.query.commentId], (err, data) => {
        if(err){
            console.log(err)
        }else{
            console.log("Successfully Created Post")
            console.log(data)
            res.status(200).json(data)
        }
        //(!err? null : err, data);

    });
})


module.exports = {
    GetPosts,
    GetPost,
    CreatePost,
    DeletePost,
    EditPost,
    GetComments,
    DeleteComment,
    PostComment
}


