const http= require('http')
const url = require('url')
const notFound = require('./src/controllers/notFound')
const routers = require('./src/routers/routers')
const fs = require("fs");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const qs = require('qs');

dotenv.config();

let mimeTypes = {
    'jpg': 'images/jpg',
    'png': 'images/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/ttf',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'eot': 'application/vnd.ms-fontobject',
    'jfif': 'image/jpeg'
}

const server = http.createServer((req, res)=>{

    let urlParse = url.parse(req.url);
    let path = urlParse.pathname

    const filesDefences = path.match(/\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot|\.jfif/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': extension});
        fs.createReadStream(__dirname + req.url).pipe(res)

    } else {
        let chooseHandle;
        if (typeof routers[path] === 'undefined') {
            chooseHandle = notFound
        } else {
            chooseHandle = routers[path]
        }
        chooseHandle(req, res)
    }
})

server.listen(3000,'localhost',()=>{
    console.log('server is running on http://localhost:3000/user/login')
})


