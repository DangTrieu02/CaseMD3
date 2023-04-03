const mysql = require('mysql')

class Connection {
    static configToMySql = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'socialmedia',
        charset: 'utf8_general_ci'
    }

    static getConnect() {
        return mysql.createConnection(this.configToMySql)
    }

    static connecting() {
        return new Promise((resolve, reject) => {
            Connection.getConnect().connect((err,result)=>{
                if (err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = Connection;
