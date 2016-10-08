"use strict";

angular
    .module('blog2')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            // TODO: check if there is some sort of reverse route lookup
            $routeProvider
                .when('/', {
                    template: '<post-list></post-list>'
                })
                .when('/post/:postId', {
                    template: '<post-detail></post-detail>'
                })
                .when('/new', {
                    template: '<post-edit></post-edit>'
                })
                .when('/edit/:postId', {
                    template: '<post-edit></post-edit>'
                })
                .otherwise('/');
        }
    ]);
