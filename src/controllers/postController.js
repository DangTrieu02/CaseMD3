const Base = require('./base')
const PostService = require('../service/PostService')
const qs = require("qs");
const UserService = require("../service/userService");
class PostController{
    constructor() {}
    static async createPost(req,res){
        try{
            console.log(1)
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async () => {
                let userId= await Base.getId(res,req)
                let {postImg,postContent}= await qs.parse(data);
                console.log(postContent,postImg)
                let post = {postImg:postImg,postContent:postContent}
                await PostService.createPost(userId,post)
                await Base.write(req, res, 301, {'location': '/home'}, '')
            })
        }catch(err){
            console.log(err)
        }
    }

}
module.exports = PostController;