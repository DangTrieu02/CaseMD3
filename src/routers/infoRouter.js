const infoController = require('../controllers/infoController')
const infoRouter = {
    '/user/info': infoController.showInfo,
    '/info/edit': infoController.showFormEdit,
}
module.exports = infoRouter;