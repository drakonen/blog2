var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String // FIXME: link to user
});

var UserSchema = mongoose.Schema({
    name: String
});



var Post = mongoose.model('Post', PostSchema);
var User = mongoose.model('User', UserSchema);

module.exports = {Post, User};
