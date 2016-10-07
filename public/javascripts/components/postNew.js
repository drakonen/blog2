"use strict";


angular.module('postNew', ['core.post']);

angular
    .module('blog2')
    .component('postNew', {
        template:
            `<form>
                 <div class="form-group">
                     <label>Title:<input class="form-control" type="text" ng-model="post.title"></label>
                 </div>
                 <div class="form-group">
                     <label>Author:<input class="form-control" type="text" ng-model="post.author"></label>
                 </div>
                 <div class="form-group">
                     <textarea class="form-control" ng-model="post.body"></textarea>
                 </div>
                 
                 <input class="btn btn-default" type="submit" ng-click="save(post)" value="Save" />
             </form>

             <!--<pre>master = {{post| json}}</pre>-->
             `,
        controller: ["$scope", "Post", function PostDetailController($scope, Post) {
            $scope.save = function () {
                Post.save($scope.post);
            }
        } ]
    });
