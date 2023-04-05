const Base = require('./base')
const UserService = require("../service/userService");
const PostService = require("../service/postService")
class HomeController{
    constructor(){}
    static async home(req, res) {
        try {
            let id = await Base.getId(req, res)
            let user = await UserService.findOne(id)
            let html = await Base.readFile('./src/views/home.html')
            let posts= await PostService.getAllPost(id)
            html = await HomeController.getList( html,posts)
            html = html.replaceAll('{username}', `${user[0].name}`)
            let avatar = `
                <a href="/info/edit">
                <img width="50px" height="50px" style="border-radius: 75%" ;" src="./src/public/${user[0].avatar}" alt="Ảnh điện dại">
                </a>`
            html = html.replaceAll('{avatar}', avatar)
            await Base.write(req, res, 200, 'text/html', html)
        } catch (err) {
            console.log(err)
        }
    }
    static async getList(listHtml, posts){
        let tbody=''
        posts.map((post)=>{
            tbody+=`<div class="main-content-post">
      <div class="main-content-post-user">
        <div class="main-content-post-user-header">
          <div class="main-content-post-user-header-avatar">
            <img width="50px" height="50px" style="border-radius: 75%" src="./src/public/${post.avatar}" alt="">
          </div>
          <div class="main-content-post-user-header-name">
            <a href="/info/${post.userId}">${post.name}</a>
          </div>
        </div>
        <div class="main-content-post-user-body">
          <div class="main-content-post-user-body-text">
            <p>${post.postContent}</p>
          </div>
          <div class="main-content-post-user-body-img">
           <img src="./src/public/${post.postImg}" alt="">
          </div>
        </div>
        <div class="main-content-post-user-footer">
          <div class="main-content-post-user-footer-icon">
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="main-content-post-user-footer-icon">
            <i class="fa-light fa-comment"></i>
          </div>
          <div class="main-content-post-user-footer-icon">
            <i class="fa-regular fa-share"></i>
          </div>
        </div>
      </div>
     </div>`
        })
        listHtml = listHtml.replace('{listPost}',tbody)
        return listHtml;
    }

}

module.exports = HomeController;
