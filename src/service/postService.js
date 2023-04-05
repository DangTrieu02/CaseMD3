const connection = require('../models/connection')
connection.connecting();

class PostService {
    constructor() {
    }
    static getAllPost(id) {
        let connect = connection.getConnect()
        return new Promise((resolve, reject) => {
            let sql = `select distinct p.* , u.name, u.userId,u.avatar from post  p
                    join user u on p.userId = u.userId
                    join friend f on u.userId = f.userId
                    where p.userId = ${id}
                    or p.userId in (select f.user2id from friend f where f.userid = ${id})
                    order by p.time desc`;
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
    static deletePost(id, idPost) {
        let connect = connection.getConnect()
        return new Promise((resolve,reject)=>{
            let sql =`delete from socialmedia.post where userid='${id}' and postId='${idPost}'`
            connect.query(sql,(err,result)=>{
                if (err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
    static updatePost(postImg, postContent,postId) {
        let connect = connection.getConnect()
        return new Promise((resolve, reject) => {
            let sql = `UPDATE socialmedia.post t
                       SET t.postImg='${postImg}',
                           t.postContent= '${postContent}',
                       where t.postid= '${postId}'`
            connect.query(sql,(err,result)=>{
                if (err) {
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
    static findPost(postName){
        let connect= connection.getConnect()
        return new Promise((resolve, reject) => {
            let sql = `select * from socialmedia.post where post.postContent like'%${postName}%'`
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

module.exports = PostService;