const postController = require('../controllers/postController')
const postRouter={
    '/post/create': postController.create, '/post/newFeed': postController.newFeed,
}
module.exports = postRouter;