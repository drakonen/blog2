"use strict";

angular
    .module('blog2')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/', {
                    template: '<post-list></post-list>'
                })
                .when('/post/:postId', {
                    template: '<post-detail></post-detail>'
                })
                .when('/new', {
                    template: '<post-new></post-new>'
                })
                .otherwise('/');
        }
    ]);
