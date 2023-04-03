const HomeController = require('../controllers/homeController')
const homeRouter = {
    '/home': HomeController.home
}
module.exports = homeRouter;