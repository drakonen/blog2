var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/posts', function(req, res, next) {

    models.Post.find({}, function (err, posts) {

        res.send(JSON.stringify(posts));
    });

});

// new post
router.post('/post', function(req, res, next) {
    console.log("req", req.body);

    var data = {
        title: req.body.data,
        body: req.body.body,
        author: req.body.author
    };


    var post = models.Post(data);
    post.save();

    res.send("ok");
});

module.exports = router;
