const userController = require('../controllers/userController')
const userRouter={
    '/user/register': userController.register,
    '/user/login': userController.login,
}
module.exports = userRouter;