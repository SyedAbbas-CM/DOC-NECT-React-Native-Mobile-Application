const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../Model/User.model');
const Validate = require('../MiddleWare/Validate');
const UserController = require('../Controllers/User.controller');
const{
    GetPosts,
    GetPost,
    CreatePost,
    DeletePost,
    EditPost,    GetComments,
    DeleteComment,PostComment
} = require('../Controllers/FeedController')



const Router = express.Router();

Router.route('/main').get( GetPosts);
Router.route('/main/:postId').get( GetPost);
Router.route('/Create').post(CreatePost)
Router.route('/Delete').delete(DeletePost);
Router.route('/Edit').post(EditPost);
Router.route('/main/:postId/comments').get(GetComments);
Router.route('/main/:postId/Post').post(PostComment);
Router.route('/main/:postId/delete').delete(DeleteComment);
module.exports = Router;