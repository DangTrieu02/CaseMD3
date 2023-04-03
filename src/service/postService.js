const connection = require('../models/connection')
connection.connecting();

class PostService {
    constructor() {
    }

    static getAllPost(id) {
        let connect = connection.getConnect()
        return new Promise((resolve, reject) => {
            let sql = `select distinct p.*
                       from post p
                                join user u on p.userId = u.userId
                                join friend f on u.userId = f.userId
                       where p.userId = '${id}'
                          or p.userId in (select f.user2id from friend f where f.userid = ${id})
                       order by p.time`;
            connect.query(sql, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }

    static createPost(id, post) {
        let connect = connection.getConnect()
        return new Promise((resolve, reject) => {
            let sql = `insert into socialmedia.post (postImg, postContent, userid)
                       values ('${post.postImg}', '${post.postContent}', '${id}')`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = PostService;