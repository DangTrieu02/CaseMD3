const userRouter = require('./userRouter')
const homeRouter = require('./homeRouter')
const infoRouter = require('./infoRouter')
const postRouter = require('./postRouter')
const routers ={
    ...userRouter, ...homeRouter,...infoRouter,...postRouter,
}
module.exports = routers;