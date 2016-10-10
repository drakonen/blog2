"use strict";

angular
    .module('blog2')
    .component('postDetail', {
        template:
            `<article>
                 <h2>{{$ctrl.post.title}} <small><a href="#!/edit/{{$ctrl.post._id}}">Edit</a></small></h2>
                 <span>{{$ctrl.post.author}}</span>
                 <p>{{$ctrl.post.body}}</p>
             </article>
             <div ng-if="$ctrl.post.$resolved">
                 <post-stats post="$ctrl.post"></post-stats>
             </div>`,
        controller: ['$routeParams', "Post", function PostDetailController($routeParams, Post) {
            this.postId = $routeParams.postId;
            this.post = Post.get({ postId: this.postId, isArray: false });
        } ]
    });
