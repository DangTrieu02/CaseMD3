const Base = require('./base')
const qs = require('qs')
const UserService = require('../service/userService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Process = require('process')

class UserController {
    constructor() {
    }

    static async register(req, res) {
        try {
            if (req.method === "GET") {
                let showFormRegister = await Base.readFile('./src/views/register.html')
                await Base.write(req, res, 200, 'text/html', showFormRegister)
            } else {
                let data = '';
                req.on('data', chunk => {
                    data += chunk;
                })
                req.on('end', async () => {
                    let user = qs.parse(data)
                    let isUserExist = await UserService.checkUser(user)
                    if (isUserExist) {
                        await Base.write(req, res, 301, {'location': '/user/register'}, 'tài khoản đã tồn tại  !!')
                    } else {
                        const {email, name, password, gender} = qs.parse(data)
                        let passwordHash = await bcrypt.hash(password, 10);
                        let user = {email: email, name: name, password: passwordHash, gender: gender}
                        await UserService.register(user)
                        await Base.write(req, res, 301, {'location': '/user/login'}, '')
                    }
                })
            }
        } catch (e) {
            console.log(e + ' loi o register controller')
        }
    }

    static async login(req, res) {
        try {
            if (req.method === 'GET') {
                let showFormLogin = await Base.readFile('./src/views/login.html')
                await Base.write(req, res, 200, 'text/html', showFormLogin)
            } else {
                let data = '';
                req.on('data', chunk => {
                    data += chunk;
                })
                req.on('end', async () => {
                    let userInput = qs.parse(data)
                    let isUserExist = await UserService.checkUser(userInput)
                    if (isUserExist) {
                        let user = await UserService.getUser(isUserExist[0].email)
                        await bcrypt.compare(userInput.password, user[0].password, (err, same) => {
                            if (same) {
                                let token = jwt.sign({
                                    iss: "Dang95",
                                    sub: user[0].userId,
                                    iat: new Date().getTime()
                                }, Process.env.SECRET)
                                const cookieValue = `authorization=Bearer ${token}; HttpOnly; Path=/; SameSite=Strict;`
                                res.setHeader('set-cookie', cookieValue)

                                Base.write(req, res, 301, {'location': '/home'}, '')
                            } else {
                                Base.write(req, res, 200, 'text/html', '<h1>tai khoan || mat khau sai anh oi </h1>')
                            }
                        });
                    } else {
                        await Base.write(req, res, 200, 'text/html', '<h1>tai khoan khong ton tai a oi </h1>')
                    }
                });
            }
        } catch (err) {
            console.log(err)
        }
    }


}

module.exports = UserController;