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
    models.Post.findOne({"_id": req.params.postId }, function (err, post) {
        if (err) {
            return res.json({ error: err });
        }

        res.json(post);
    });

});

router.delete('/posts', function(req, res, next) {
    models.Post.remove({}, function (err) {
        if (err) {
            return res.json({ "error": err });
        }
        res.json({ "ok": "ok" });
    });
});

// new post
router.post('/post', function(req, res, next) {

    var newData = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    };


    var query = { '_id': req.body._id };
    models.Post.findOne(query, function(err, post) {
        if (post == null) {
            // new
            new models.Post(newData).save(function (err, post) {
                res.json(post);
            });
        } else {
            post.title = newData.title;
            post.body = newData.body;
            post.author = newData.author;

            post.save(function (post) {
                if (err) {
                    res.json({ "error": err });
                }
                res.json(post);
            })
        }
    });

});

module.exports = router;
