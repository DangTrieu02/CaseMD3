const userController = require('../controllers/userController')
const userRouter={
    '/user/register': userController.register,
    '/user/login': userController.login,
    '/user/logout': userController.logout
}
module.exports = userRouter;