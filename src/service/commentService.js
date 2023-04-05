const connection = require('../models/connection')
connection.connecting();

class CommentService{
    static getAllComments(idPost){
        let connect = connection.getConnect()
        return new Promise((resolve, reject) =>{
            let sql =`SELECT * FROM comment where postid='${idPost}'`
            connect.query(sql,(err,result) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    static createComment(comment,idUser,idPost){
        let connect = connection.getConnect()
        return new Promise((resolve, reject) =>{
            let sql =`insert into socialmeida.comment(content,userid, postid) values('${comment}','${idPost}','${idUser}') `
            connect.query(sql,(err,result) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = CommentService;