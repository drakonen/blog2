var express = require('express');
var models = require('../models');
var router = express.Router();



router.get('/echo', function(req, res, next) {
    res.send("ok")
});


/* GET users listing. */
router.get('/posts', function(req, res, next) {
    models.Post.find(function (err, posts) {
        if (err) {
            return res.json({error: err});
        }

        res.json(posts);
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
