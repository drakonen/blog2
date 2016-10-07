var express = require('express');
var models = require('../models');
var router = express.Router();



router.get('/echo', function(req, res, next) {
    res.send("ok")
});


router.get('/post', function(req, res, next) {
    models.Post.find(function (err, posts) {
        if (err) {
            return res.json({error: err});
        }

        res.json(posts);
    });

});


router.get('/post/:postId', function(req, res, next) {
    console.log("postId", req.params.postId, req.params);
    models.Post.findOne({"_id": req.params.postId }, function (err, post) {
        if (err) {
            return res.json({error: err});
        }

        res.json(post);
    });

});

router.delete('/posts', function(req, res, next) {
    models.Post.remove({}, function (err) {
        if (err) {
            return res.json({"error": err});
        }
        res.json({ "ok": "ok" });
    });
});

// new post
router.post('/post', function(req, res, next) {

    var data = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    };


    var post = models.Post(data);
    post.save(function () {
        res.send("ok");
    });

});

module.exports = router;
