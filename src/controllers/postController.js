const Base = require('./base')
const PostService = require('../service/PostService')
const qs = require("qs");
const UserService = require("../service/userService");

class PostController {
    constructor() {}
    static async createPost(req, res) {
        try {
            let data='';
            req.on('data', chunk => {
                data+=chunk;
            })
            req.on('end', async () =>{
                let idUser = await Base.getId(req, res)
                let post= qs.parse(data);
                await PostService.createPost(idUser,post)
            })
        } catch(e) {
            console.log(e)
        } finally {
          await Base.write(req, res,301,{'location':'/home'},'')
        }
    }
}
module.exports = PostController;