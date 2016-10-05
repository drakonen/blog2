angular
    .module('blog2')
    .component('postDetail', {
        template:
            `<article>
                 <h2>{{$ctrl.post.title}}</h2>
                 <span>{{$ctrl.post.author}}</span>
                 <p>{{$ctrl.post.body}}</p>
                 </article>`,
        controller: function PostDetailController() {
            this.post = {
                "_id": "57f4ce7aa14f2237af21c1c3",
                "updatedAt": "2016-10-05T09:57:14.462Z",
                "createdAt": "2016-10-05T09:57:14.462Z",
                "title": "Title",
                "body": "jfkghkd dasfsdf asdf asdf sdf asdf asdf gbhdsfkjg hsueig htr5uys bur gbsdkbrg ysbgr",
                "author": "me",
                "__v": 0
            };
        }
    });
