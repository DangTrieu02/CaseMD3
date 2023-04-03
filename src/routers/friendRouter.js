const friendController = require('../controllers/friendController')
const friendRouter={
    '/friend/list': friendController.showAll,
}
module.exports = friendRouter;