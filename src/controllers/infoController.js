const fs = require('fs')
const UserService = require('../service/userService')
const jwt = require('jsonwebtoken')
const Base = require("./base");
const Process = require("process");
const qs = require('qs')
const url = require('url')
const querystring = require('querystring')

class InfoController {
    static async showInfo(req, res) {
        try {
            let id = url.parse(req.url)
            let user = await UserService.findOne(id.query)
            let html = await Base.readFile('./src/views/info.html')
            let name = `${user[0].name}`
            let backgroundImg = `<img src="../src/public/${user[0].backgroundImg}" alt="">`
            let avatar = `<img src="../src/public/${user[0].avatar}" alt="">`
            html = html.replace('{username}', name)
            html = html.replace('{backgroundImg}', backgroundImg)
            html = html.replace('{avatar}', avatar)
            await Base.write(req, res, 200, 'text/html', html)
        } catch (err) {
            console.log(err)
        }
    }

    static async editAvatar(req, res) {
        try {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                let userUpdate = qs.parse(data);
                let id = await Base.getId(req, res)
                await UserService.updateUser(id, userUpdate.name, userUpdate.gender, userUpdate.avatar, userUpdate.birthday, userUpdate.backgroundImg)
            })
        } catch (err) {
            console.log(err)
        } finally {
            await Base.write(req, res, 301, {'location': '/home'}, 'sua ngon')
        }
    }
}

module.exports = InfoController;