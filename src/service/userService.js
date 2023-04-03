const connection = require('../models/connection')
connection.connecting();

class UserService {
    static register(user) {
        let connect = connection.getConnect()
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO socialmedia.user (email, password, name, gender)
                       VALUES ('${user.email}', '${user.password}', '${user.name}', '${user.gender}')`
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static checkUser(user) {
        return new Promise((resolve, reject) => {
            let connect = connection.getConnect()
            let sql = `SELECT email
                       FROM socialmedia.user
                       WHERE email = '${user.email}'`
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                }
                if (result.length > 0) {
                    resolve(result)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static getUser(email) {
        return new Promise((resolve, reject) => {
            let connect = connection.getConnect()
            let sql = `SELECT *
                       FROM socialmedia.user
                       WHERE email = '${email}'`
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        })
    }

    static findOne(userId) {
        return new Promise((resolve, reject) => {
            let connect = connection.getConnect()
            let sql = `SELECT *
                       FROM socialmedia.user
                       WHERE userId = '${userId}'`
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        })
    }

    static updateUser(userId, name, gender, avatar, birthday, backgroundImg) {
        return new Promise((resolve, reject) => {
            let connect = connection.getConnect()
            let sql = `UPDATE socialmedia.user t
                       SET t.name='${name}',
                           t.gender= '${gender}',
                           t.avatar= '${avatar}',
                           t.birthday = '${birthday}',
                           t.backgroundImg= '${backgroundImg}'
                       where t.userid = '${userId}'`
            connect.query(sql,(err,result)=>{
                if (err) {
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

}

module.exports = UserService;