const connection = require('../models/connection')
connection.connecting();

class FriendService {
    constructor() {}
    static getAll(id) {
        let connect = connection.getConnect()
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM friend WHERE id = ${id} and status= 'bạn bè'`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        })
    }
    static addFriend(id, friend) {
        let connect = connection.getConnect()
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO socialmedia.friend(userid,user2id) values ('${id}','${friend}')`
            connect.query(sql, (err, result) =>{
                if (err) {
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    static confirmFriend(id, friend) {
        let connect = connection.getConnect()
        return new Promise((resolve, reject)=>{
        let sql=`update socialmedia.friend set status= 'bạn bè' where userid='${id}' and user2id='${friend}'`
            connect.query(sql,(err, result)=>{
                if (err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    static unfriend(id, friend) {
        let connect = connection.getConnect()
        return new Promise((resolve,reject)=>{
            let sql =`delete from socialmedia.friend where userid='${id}' and user2id='${friend}'`
            connect.query(sql,(err,result)=>{
                if (err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
}
module.exports = FriendService;