process.env.NODE_ENV = 'test';



var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var bluebird = require('bluebird');

var app = require('../app');


mongoose.Promise = Promise;


before(function (done) {
    mockgoose(mongoose).then(function () {
        mongoose.connect('mongodb://example.com/TestingDB', done);
    });
});

beforeEach(function (done) {
    mockgoose.reset(done);
});

after(function (done) {
    mongoose.unmock(done);
});


function createPost(next) {
    var post = new mongoose.models.Post({
        "title": "title",
        "body": "body",
        "author": "me"
    });
    post.save(next)
}


describe('Api', function() {
    describe('/echo', function() {
        it('should return return "ok"', function(done) {
            request(app)
                .get('/api/1/posts')
                .expect(200)
                .expect(function (res) {
                    return res.text == "ok";
                })
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('/posts', function() {
        it('should return all posts as JSON even when there are none', function(done) {
            request(app)
                .get('/api/1/posts')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    return res.body.length == 0;
                })
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should return all posts as JSON', function(done) {
            createPost(function (err) {
                if (err) { return console.log(err) }

                request(app)
                    .get('/api/1/posts')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(function (res) {
                        return res.body.length == 1;
                    })
                    .end(function(err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });
    });

    describe('Post creation /post', function() {
        var newPost = {
            title: "new Title",
            body: 'fgikahsfku hfyksdarg jkysdr bgyjrgfuksdbfg sdgfydrfgb sdyjkr bfgysdrfg bsdyurfg bsdruk bg',
            author: "me"
        };

        it('should create a blog post', function(done) {
            request(app)
                .post('/api/1/post')
                .send(newPost)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    mongoose.models.Post.find(function (err, models) {
                        assert.equal(models[0].title, newPost.title);
                        assert.equal(models[0].body, newPost.body);
                        assert.equal(models[0].author, newPost.author);
                        done();
                    });
                });
        });

        it('should create 2nd blog posts', function(done) {
            createPost(function () {
                request(app)
                    .post('/api/1/post')
                    .send({
                        title: "Title",
                        body: 'fgikahsfku hfyksdarg jkysdr bgyjrgfuksdbfg sdgfydrfgb sdyjkr bfgysdrfg bsdyurfg bsdruk bg',
                        author: "me"
                    })
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        mongoose.models.Post.find(function (err, models) {
                            assert.equal(models.length, 2);
                            done();
                        });
                    });
            })
        });
    });
});
