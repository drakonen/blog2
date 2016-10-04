var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/posts', function(req, res, next) {

    models.Post.find({}, function (err, posts) {

        res.send('respond with a resource' + JSON.stringify([posts]));
    });

});

module.exports = router;
