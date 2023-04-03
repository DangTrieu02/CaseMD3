const Base = require('./base')
const UserService = require("../service/userService");

class HomeController{
    constructor(){}
    static async home(req, res) {
        try {
            let id = await Base.getId(req, res)
            let user = await UserService.findOne(id)
            let html = await Base.readFile('./src/views/home.html')
            html = html.replaceAll('{username}', `${user[0].name}`)
            let avatar = `
                <a href="/info/edit">
                <img src="./src/public/${user[0].avatar}" alt="Ảnh điện dại">
                </a>`
            html = html.replaceAll('{avatar}', avatar)
            await Base.write(req, res, 200, 'text/html', html)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = HomeController;
