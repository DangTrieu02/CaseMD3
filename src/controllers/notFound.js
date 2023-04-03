const Base = require('./base')
async function show404(req,res){
 let notFound = await Base.readFile('./src/views/notFound.html')
 res.writeHead(200,'text/html');
 res.write(notFound);
 res.end()
}

module.exports = show404;