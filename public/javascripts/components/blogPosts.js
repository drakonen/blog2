angular
    .module('blog2')
    .component('blogPosts', {
            template:
                `<article ng-repeat="post in $ctrl.posts">
                 <h2>{{post.title}}</h2>
                 <span>{{post.author}}</span>
                 <p>{{post.body}}</p>
                 </article>`,
            controller: function BlogPostsController() {
                this.posts = [
                    {
                        "_id": "57f4ce7aa14f2237af21c1c3",
                        "updatedAt": "2016-10-05T09:57:14.462Z",
                        "createdAt": "2016-10-05T09:57:14.462Z",
                        "title": "Title",
                        "body": "jfkghkd dasfsdf asdf asdf sdf asdf asdf gbhdsfkjg hsueig htr5uys bur gbsdkbrg ysbgr",
                        "author": "me",
                        "__v": 0
                    },
                    {
                        "_id": "57f4ce7aa14f2237af21c1c3",
                        "updatedAt": "2016-10-05T09:57:14.462Z",
                        "createdAt": "2016-10-05T09:57:14.462Z",
                        "title": "Title 2",
                        "body": "jfkghkd dasfsdf asdf asdf sdf asdf asdf gbhdsfkjg hsueig htr5uys bur gbsdkbrg ysbgr",
                        "author": "me",
                        "__v": 0
                    }
                ];
            }
        });