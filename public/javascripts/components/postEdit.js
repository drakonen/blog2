"use strict";


angular.module('postEdit', ['core.post']);

angular
    .module('blog2')
    .component('postEdit', {
        template:
            `<form>
                 <div class="form-group">
                     <label>Title:<input class="form-control" type="text" ng-model="post.title" value="{{$ctrl.post.title}}"></label>
                 </div>
                 <div class="form-group">
                     <label>Author:<input class="form-control" type="text" ng-model="post.author" value="{{$ctrl.post.author}}"></label>
                 </div>
                 <div class="form-group">
                     <textarea class="form-control" ng-model="post.body" value="{{$ctrl.post.body}}"></textarea>
                 </div>
                 
                 <input class="btn btn-default" type="submit" ng-click="save(post)" value="Save" />
             </form>

             <!--<pre>master = {{post| json}}</pre>-->
             `,
        controller: ["$scope", '$routeParams', "Post", function PostDetailController($scope, $routeParams, Post) {
            console.log("routeparams", $routeParams);
            if (Object.keys($routeParams).length) {
                // we got an postId, load it to be edited
                var postId = $routeParams.postId;
                $scope.post = Post.get({ postId: postId });


            }

            $scope.save = function () {
                Post.save($scope.post);
            }
        } ]
    });
