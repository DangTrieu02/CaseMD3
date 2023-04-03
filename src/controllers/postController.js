const Base = require('./base')
const PostService = require('../service/PostService')
class PostController{
    constructor() {}
    static async newFeed(req, res){
        let id = Base.getId(req,res)
        let posts= await PostService.getAllPost(id)

    }
    static async create(req,res){
        if(req.method === 'GET'){
            let html= await Base.readFile('./src/views/createPost.html');
            await Base.write(req,res,200,'text:html',html);
        }else{

        }
    }
}
module.exports = PostController;