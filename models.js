var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String
}, {
    timestamps: true // adds updatedAt and createdAt to model
});

var UserSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true // adds updatedAt and createdAt to model
});



var Post = mongoose.model('Post', PostSchema);
var User = mongoose.model('User', UserSchema);

module.exports = {Post, User};
