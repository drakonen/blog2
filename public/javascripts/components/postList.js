"use strict";

angular.module('core', ['core.post']);

angular.module('core.post', ['ngResource']);


angular
    .module('core.post')
    .factory('Post', ['$resource',
        function($resource) {
            return $resource('/api/1/post/:postId', {}, {
                query: {
                    method: 'GET',
                    // params: {postId: 'posts'},
                    isArray: true
                }
            });
        }
    ]);



angular.module('postList', ['core.post']);

angular
    .module('postList')
    .component('postList', {
            template:
                `<article ng-repeat="post in $ctrl.posts">
                 <a href="#!/post/{{post._id}}"><h2>{{post.title}}</h2></a>
                 <span>{{post.author}}</span>
                 <p>{{post.body}}</p>
                 </article>`,
            controller: ['Post', function PostListController(Post) {
                this.posts = Post.query();
            }]
        });

