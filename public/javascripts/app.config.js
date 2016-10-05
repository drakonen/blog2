angular
    .module('blog2')
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/', {
                    template: '<blog-posts></blog-posts>'
                })
                .when('/post/:postId', {
                    template: '<post-detail></post-detail>'
                })
                .otherwise('/');
        }
    ]);
