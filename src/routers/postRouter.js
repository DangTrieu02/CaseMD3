const postController = require('../controllers/postController')
const postRouter={
    '/post/create': postController.createPost,
}
module.exports = postRouter;