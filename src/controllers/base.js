const fs = require('fs')
const UserService = require('../service/userService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Process = require('process')

class Base {
    static async readFile(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    static async write(req, res, statusCode, type, data) {
        res.writeHead(statusCode, type)
        res.write(data)
        res.end()
    }

    static async getId(req, res) {
        let cookies = req.headers.cookie
        let token = cookies.split(' ')[1]
        let userSub = jwt.verify(token, Process.env.SECRET);
        return userSub.sub
    }

    static async insertName(html, user) {
        let tbody = ''
        tbody+=`<div class="profile-name"> ${user.name}</div>`
        html = html.replace('{where}', tbody)
        return html;
    }
}

module.exports = Base;