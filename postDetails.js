class PostDetailsView {
    postsModel = new PostsModel();

    usersModel = new UsersModel();

    commentsModel  = new CommentsModel();

    constructor() {

        const id = this.getPostId();
        const post = this.postsModel.getPostById(id);
        this.hidrateHtml(post);

        document.querySelector('[data-post="add-comment"]').addEventListener('click', () => {
            
            this.handleAddComment(id);
        });
    }

    getPostId() {
        const params = new URLSearchParams(location.search);
        return params.get('id');
    }

    hidrateHtml(data) {

       data.then(post => {

            this.hidrateAuthor(post.userId);
            this.hidrateComments(post.id);

            const titleElem = document.querySelector('[data-post="tile"]');
            const bodyElem = document.querySelector('[data-post="body"]');

            titleElem.innerText = post.title;
            bodyElem.innerText = post.body;
       })
    }

    hidrateAuthor(userId) {

        this.usersModel.getUsersDetails(userId).then(user => {

            document.querySelector('[data-post="author"]').innerText = `Author: ${user.name}`;
        })
    }

    hidrateComments(commentId) {

        this.commentsModel.getCommentsDetails(commentId).then(commentDetails => {

            for(const comment of commentDetails) {

                document.querySelector('[data-post="comments"]').innerHTML += `<div> ${comment.body} </div> <br>`;
            }
        })
    }

    handleAddComment(commentId) {

        const comment = document.getElementById('comment').value;

        this.commentsModel.postComment(commentId, comment).then(commentParsed => document.querySelector('[data-post="comments"]').innerHTML += `<div> ${commentParsed.body} </div> <br>`);   
    }
}

new PostDetailsView();