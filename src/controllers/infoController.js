const fs = require('fs')
const UserService = require('../service/userService')
const jwt = require('jsonwebtoken')
const Base = require("./base");
const Process = require("process");
const qs = require('qs')

class InfoController {
    static async showInfo(req, res) {
        try {
            let id = await Base.getId(req, res)
            let user = await UserService.findOne(id)
            let html = await Base.readFile('./src/views/info.html')
            let name = `${user[0].name}`
            html = html.replaceAll('{username}', name)
            let backgroundImg = `${user[0].backgroundImg}`
            html = html.replaceAll('{backgroundImg}', backgroundImg)
            let avatar = `${user[0].avatar}`
            html = html.replaceAll('{backgroundImg}', avatar)

            await Base.write(req, res, 200, 'text/html', html)
        } catch (err) {
            console.log(err)
        }
    }

    static async showFormEdit(req, res) {
        if (req.method === 'GET') {
            let html = await Base.readFile('./src/views/editProfile.html')
            await Base.write(req, res, 200, 'text/html', html)
        } else {
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
            }finally {
               await Base.write(req, res, 301, {'location': '/home'}, 'sua ngon')
            }
        }
    }
}

module.exports = InfoController;