const postController = require('../controllers/postController')
const postRouter={
    '/post/create': postController.createPost,
    '/post/edit': postController.editPost,
}
module.exports = postRouter;